import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { identifyUser, resetUser } from '../lib/posthog'
import { getStoredUTMs } from '../lib/utm'
import type { User, CheckIn, SessionLog, Milestone, OnboardingProfile, SubscriptionStatus, TrialStatus } from '../types'

// ── LocalStorage fallback (dev / offline) ───────────────────
const KEYS = {
  user: 'dadfit_user',
  checkIns: 'dadfit_checkins',
  sessions: 'dadfit_sessions',
  milestones: 'dadfit_milestones',
  onboarded: 'dadfit_onboarded',
}

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch { return fallback }
}
function writeLS<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export const DEFAULT_MILESTONES: Milestone[] = [
  { id: 'm1', triggerSessions: 1,  label: 'First workout',   emoji: '🚀', unlocked: false },
  { id: 'm2', triggerSessions: 5,  label: 'Habit forming',   emoji: '🔥', unlocked: false },
  { id: 'm3', triggerSessions: 10, label: 'Consistent',      emoji: '💪', unlocked: false },
  { id: 'm4', triggerSessions: 15, label: 'Halfway',         emoji: '⚡', unlocked: false },
  { id: 'm5', triggerSessions: 20, label: 'Transformer',     emoji: '🏆', unlocked: false },
  { id: 'm6', triggerSessions: 30, label: 'Lifestyle',       emoji: '🌟', unlocked: false },
]

const DEFAULT_USER: User = {
  id: 'local',
  name: '',
  goals: { steps: 7000, waterL: 2, bedtime: '23:00' },
  startDate: new Date().toISOString().split('T')[0],
  weightCurrent: 0,
  weightTarget: 0,
  programDays: 90,
}

// ── Context shape ────────────────────────────────────────────
interface AppContextType {
  // Auth
  authUser: SupabaseUser | null
  authLoading: boolean
  subscriptionStatus: SubscriptionStatus
  trialStatus: TrialStatus
  trialDaysLeft: number
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, utmParams?: Record<string, string>) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  // App data
  user: User
  checkIns: CheckIn[]
  sessions: SessionLog[]
  milestones: Milestone[]
  isOnboarded: boolean
  todayCheckIn: CheckIn | null
  completedCount: number
  upsertCheckIn: (ci: Omit<CheckIn, 'id' | 'userId'>) => void
  addSession: (s: Omit<SessionLog, 'id' | 'userId'>) => Milestone | null
  updateUser: (u: Partial<User>) => void
  completeOnboarding: (profile: OnboardingProfile) => Promise<{ error: string | null }>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ── Auth state ──────────────────────────────────────────
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null)
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured)
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('none')
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null)

  // ── App data (localStorage primary, Supabase sync when configured) ──
  const [user, setUser] = useState<User>(() => readLS(KEYS.user, DEFAULT_USER))
  const [checkIns, setCheckIns] = useState<CheckIn[]>(() => readLS(KEYS.checkIns, []))
  const [sessions, setSessions] = useState<SessionLog[]>(() => readLS(KEYS.sessions, []))
  const [milestones, setMilestones] = useState<Milestone[]>(() => readLS(KEYS.milestones, DEFAULT_MILESTONES))
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => readLS(KEYS.onboarded, false))

  // ── Supabase auth listener ──────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setAuthUser(session?.user ?? null)
      if (session?.user) {
        await loadUserData(session.user.id)
        identifyUser(session.user.id) // no email — PII
      }
      setAuthLoading(false) // only after data loaded to prevent paywall flash
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setAuthLoading(true)          // hold spinner until profile loaded — prevents onboarding flash
        setAuthUser(session.user)
        await loadUserData(session.user.id)
        setAuthLoading(false)
        identifyUser(session.user.id)
      } else {
        setAuthUser(null)
        resetUser()
        setSubscriptionStatus('none')
        setIsOnboarded(false)
        setAuthLoading(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  // ── Load data from Supabase ─────────────────────────────
  async function loadUserData(userId: string) {
    try { await _loadUserData(userId) } catch { /* network error — keep localStorage state */ }
  }
  async function _loadUserData(userId: string) {
    const [profileRes, subRes, sessionsRes, checkInsRes, milestonesRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('subscriptions').select('status').eq('user_id', userId).single(),
      supabase.from('workout_sessions').select('*').eq('user_id', userId).order('date', { ascending: false }).limit(200),
      supabase.from('daily_logs').select('*').eq('user_id', userId).order('date', { ascending: false }).limit(90),
      supabase.from('milestones').select('milestone_key').eq('user_id', userId),
    ])

    if (subRes.data) {
      setSubscriptionStatus(subRes.data.status as SubscriptionStatus)
    }

    if (profileRes.data?.trial_ends_at) {
      setTrialEndsAt(profileRes.data.trial_ends_at)
    }

    // Save UTMs on first authenticated load if not yet stored server-side
    if (profileRes.data && !profileRes.data.utm_params) {
      const storedUtms = getStoredUTMs()
      if (Object.keys(storedUtms).length > 0) {
        supabase.from('profiles').update({ utm_params: storedUtms }).eq('id', userId).then(() => {})
      }
    }

    if (profileRes.data) {
      const p = profileRes.data
      const appUser: User = {
        id: userId,
        name: p.first_name ?? '',
        goals: { steps: 7000, waterL: 2, bedtime: '23:00' },
        startDate: p.program_start_date ?? new Date().toISOString().split('T')[0],
        weightCurrent: p.weight_kg ?? 0,
        weightTarget: p.weight_goal_kg ?? 0,
        waistCm: p.waist_cm ?? undefined,
        programDays: 90,
        age: p.age ?? undefined,
        numberOfKids: p.number_of_kids ?? undefined,
        fitnessLevel: p.fitness_level as User['fitnessLevel'] ?? undefined,
        mainGoal: p.main_goal ?? undefined,
        painAreas: p.pain_areas ?? undefined,
      }
      setUser(appUser)
      writeLS(KEYS.user, appUser)
      // Use onboarding_completed (002 migration) with onboarded_at as fallback
      if (p.onboarding_completed || p.onboarded_at) {
        setIsOnboarded(true)
        writeLS(KEYS.onboarded, true)
      } else {
        setIsOnboarded(false)
        writeLS(KEYS.onboarded, false)
      }
    }

    if (sessionsRes.data) {
      const mapped: SessionLog[] = sessionsRes.data.map(s => ({
        id: s.id,
        userId: s.user_id,
        date: s.date,
        type: s.type as SessionLog['type'],
        exercises: (s.exercises as SessionLog['exercises']) ?? [],
        status: s.status as SessionLog['status'],
        energyAfter: s.energy_after ?? undefined,
        durationMin: s.duration_min ?? undefined,
        difficultyFelt: s.difficulty_felt ?? undefined,
        painLevel: s.pain_level as SessionLog['painLevel'] ?? undefined,
      }))
      setSessions(mapped)
      writeLS(KEYS.sessions, mapped)
    }

    if (checkInsRes.data) {
      const mapped: CheckIn[] = checkInsRes.data.map(c => ({
        id: c.id,
        userId: c.user_id,
        date: c.date,
        energy: c.energy_score ?? 3,
        sleptWell: c.slept_well ?? false,
        joints: (c.joints as CheckIn['joints']) ?? 'good',
        steps: c.steps ?? 0,
        waterL: c.water_l ?? 0,
        bedtimeOK: c.bedtime_ok ?? false,
        weight: c.weight_kg ?? undefined,
      }))
      setCheckIns(mapped)
      writeLS(KEYS.checkIns, mapped)
    }

    if (milestonesRes.data) {
      const unlockedKeys = new Set(milestonesRes.data.map(m => m.milestone_key))
      const completedSessions = sessionsRes.data?.filter(s => s.status !== 'skipped').length ?? 0
      const updated = DEFAULT_MILESTONES.map(m => ({
        ...m,
        unlocked: unlockedKeys.has(m.id) || m.triggerSessions <= completedSessions,
      }))
      setMilestones(updated)
      writeLS(KEYS.milestones, updated)
    }
  }

  // ── Persist to localStorage ─────────────────────────────
  useEffect(() => { writeLS(KEYS.user, user) }, [user])
  useEffect(() => { writeLS(KEYS.checkIns, checkIns) }, [checkIns])
  useEffect(() => { writeLS(KEYS.sessions, sessions) }, [sessions])
  useEffect(() => { writeLS(KEYS.milestones, milestones) }, [milestones])

  // ── Auth methods ────────────────────────────────────────
  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }, [])

  const signUp = useCallback(async (email: string, password: string, _utmParams?: Record<string, string>) => {
    // UTMs are saved in _loadUserData on first authenticated session (post email-confirmation).
    // Saving here would fail silently — no active session until email is confirmed.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/app` },
    })
    return { error: error?.message ?? null }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    // Clear local state
    setUser(DEFAULT_USER)
    setCheckIns([])
    setSessions([])
    setMilestones(DEFAULT_MILESTONES)
    setIsOnboarded(false)
    Object.values(KEYS).forEach(k => localStorage.removeItem(k))
  }, [])

  // ── Data methods ────────────────────────────────────────
  const today = new Date().toISOString().split('T')[0]
  const todayCheckIn = checkIns.find(ci => ci.date === today) ?? null

  const upsertCheckIn = useCallback((ci: Omit<CheckIn, 'id' | 'userId'>) => {
    const uid = authUser?.id ?? 'local'
    const entry: CheckIn = { ...ci, id: `ci_${ci.date}`, userId: uid }
    setCheckIns(prev => {
      const exists = prev.find(c => c.date === ci.date)
      return exists ? prev.map(c => c.date === ci.date ? entry : c) : [entry, ...prev]
    })
    if (ci.weight) setUser(u => ({ ...u, weightCurrent: ci.weight! }))

    if (isSupabaseConfigured && authUser) {
      supabase.from('daily_logs').upsert({
        user_id: authUser.id,
        date: ci.date,
        steps: ci.steps,
        energy_score: ci.energy,
        weight_kg: ci.weight,
        slept_well: ci.sleptWell,
        joints: ci.joints,
        water_l: ci.waterL,
        bedtime_ok: ci.bedtimeOK,
      }, { onConflict: 'user_id,date' }).then(() => {})
    }
  }, [authUser])

  const addSession = useCallback((s: Omit<SessionLog, 'id' | 'userId'>): Milestone | null => {
    const uid = authUser?.id ?? 'local'
    const entry: SessionLog = { ...s, id: `s_${Date.now()}`, userId: uid }
    setSessions(prev => [...prev, entry])

    const newCount = sessions.filter(sess => sess.status !== 'skipped').length + (s.status !== 'skipped' ? 1 : 0)
    const hit = milestones.find(m => m.triggerSessions === newCount && !m.unlocked) ?? null
    if (hit) {
      setMilestones(prev => prev.map(m => m.id === hit.id ? { ...m, unlocked: true } : m))
    }

    if (isSupabaseConfigured && authUser) {
      supabase.from('workout_sessions').insert({
        user_id: authUser.id,
        date: s.date,
        type: s.type,
        status: s.status,
        duration_min: s.durationMin,
        energy_after: s.energyAfter,
        difficulty_felt: s.difficultyFelt,
        pain_level: s.painLevel,
        exercises: s.exercises as never,
      }).then(() => {})

      if (hit) {
        supabase.from('milestones').insert({ user_id: authUser.id, milestone_key: hit.id }).then(() => {})
      }
    }

    return hit ? { ...hit, unlocked: true } : null
  }, [sessions, milestones, authUser])

  const updateUser = useCallback((u: Partial<User>) => {
    setUser(prev => ({ ...prev, ...u }))
    if (isSupabaseConfigured && authUser) {
      supabase.from('profiles').update({
        first_name: u.name,
        weight_kg: u.weightCurrent,
        waist_cm: u.waistCm,
        updated_at: new Date().toISOString(),
      }).eq('id', authUser.id).then(() => {})
    }
  }, [authUser])

  // DB update is handled by Onboarding.tsx directly — this sets local state only
  const completeOnboarding = useCallback(async (profile: OnboardingProfile): Promise<{ error: string | null }> => {
    const uid = authUser?.id ?? 'local'
    const today = new Date().toISOString().split('T')[0]
    const newUser: User = {
      ...DEFAULT_USER,
      id: uid,
      name: profile.name,
      startDate: today,
      age: profile.age,
      numberOfKids: profile.numberOfKids,
      fitnessLevel: profile.fitnessLevel,
      mainGoal: profile.mainGoal,
      painAreas: profile.painAreas,
      weightCurrent: profile.weightKg ?? 0,
      waistCm: profile.waistCm,
    }
    setUser(newUser)
    writeLS(KEYS.user, newUser)
    setIsOnboarded(true)
    writeLS(KEYS.onboarded, true)
    return { error: null }
  }, [authUser])

  const completedCount = sessions.filter(s => s.status !== 'skipped').length

  // Derive trial status from profile data
  const trialStatus: TrialStatus = !trialEndsAt
    ? 'none'
    : new Date(trialEndsAt) > new Date() ? 'active' : 'expired'

  const trialDaysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / 86_400_000))
    : 0

  return (
    <AppContext.Provider value={{
      authUser, authLoading, subscriptionStatus, trialStatus, trialDaysLeft,
      signIn, signUp, signOut,
      user, checkIns, sessions, milestones, isOnboarded, todayCheckIn, completedCount,
      upsertCheckIn, addSession, updateUser, completeOnboarding,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
