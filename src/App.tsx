import React, { useState, useEffect } from 'react'
import type { View } from './types'
import { AppProvider, useApp } from './context/AppContext'
import { isSupabaseConfigured } from './lib/supabase'
import { isPaymentSuccess, clearPaymentParam } from './lib/stripe'
import { track } from './lib/posthog'
import TrialExpired from './views/TrialExpired'
import Dashboard from './views/Dashboard'
import Onboarding from './views/Onboarding'
import Programme from './views/Programme'
import Seances from './views/Seances'
import Progres from './views/Progres'
import Nutrition from './views/Nutrition'
import Defis from './views/Defis'
import Ressources from './views/Ressources'
import Premium from './views/Premium'
import Auth from './views/Auth'
import { getStreak } from './utils/score'

// ─── Sidebar icons ───────────────────────────────────────────────────────────
const IcHome = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#22C55E' : 'none'} stroke={active ? '#22C55E' : '#9CA3AF'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IcDumbbell = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#22C55E' : '#9CA3AF'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="9" width="3" height="6" rx="1.5"/><rect x="19" y="9" width="3" height="6" rx="1.5"/>
    <rect x="5" y="7" width="2" height="10" rx="1"/><rect x="17" y="7" width="2" height="10" rx="1"/>
    <line x1="7" y1="12" x2="17" y2="12"/>
  </svg>
)
const IcChart = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#22C55E' : '#9CA3AF'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)
const IcApple = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#22C55E' : '#9CA3AF'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4"/><path d="M8.5 5C5 5 3 8 3 11.5c0 5 3.5 9.5 6 9.5 1 0 2-.5 3-.5s2 .5 3 .5c2.5 0 6-4.5 6-9.5C21 8 19 5 15.5 5c-1.5 0-2.5.5-3.5.5S10 5 8.5 5z"/>
  </svg>
)
const IcTarget = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#22C55E' : '#9CA3AF'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)
const IcBook = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#22C55E' : '#9CA3AF'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)
const IcBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    <circle cx="18" cy="6" r="3" fill="#22C55E" stroke="none"/>
  </svg>
)

type NavView = View | 'entrainement' | 'nutrition' | 'defis' | 'ressources' | 'premium'
const NAV_ITEMS: { id: NavView; label: string; Icon: React.FC<{ active: boolean }> }[] = [
  { id: 'dashboard',    label: 'Accueil',        Icon: IcHome },
  { id: 'seance',       label: 'Programme',      Icon: IcBook },
  { id: 'entrainement', label: 'Entraînements',  Icon: IcDumbbell },
  { id: 'progression',  label: 'Progrès',        Icon: IcChart },
  { id: 'nutrition',    label: 'Nutrition',      Icon: IcApple },
  { id: 'defis',        label: 'Défis',          Icon: IcTarget },
  { id: 'ressources',   label: 'Ressources',     Icon: IcBook },
]

function AppShell() {
  const { user, sessions, isOnboarded, authUser, authLoading, subscriptionStatus, trialStatus, signOut } = useApp()
  const [view, setView] = useState<NavView>('dashboard')
  const [profileOpen, setProfileOpen] = useState(false)
  const stripeEnabled = import.meta.env.VITE_STRIPE_ENABLED === 'true'

  // Handle Stripe return
  useEffect(() => {
    if (isPaymentSuccess()) {
      track.completedCheckout()
      clearPaymentParam()
    }
  }, [])

  // Auth gate (Supabase only — skip in dev without config)
  if (isSupabaseConfigured) {
    if (authLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F8F5' }}>
          <div className="w-8 h-8 rounded-full border-2 border-[#22C55E] border-t-transparent animate-spin" />
        </div>
      )
    }
    if (!authUser) {
      const params = new URLSearchParams(window.location.search)
      if (!params.get('auth')) {
        window.location.replace('/')
        return null
      }
      return <Auth />
    }

    const hasPaidAccess = stripeEnabled && (subscriptionStatus === 'active' || subscriptionStatus === 'trialing')

    // Only block when Stripe is active AND trial is definitively expired AND no paid access
    if (stripeEnabled && !hasPaidAccess && trialStatus === 'expired') {
      return <TrialExpired />
    }
  }

  if (!isOnboarded) return <Onboarding />

  const streak = getStreak(sessions)
  const initial = user.name ? user.name[0].toUpperCase() : 'D'

  return (
    <div className="flex flex-col h-screen bg-[#F8F8F5] overflow-hidden">

      {/* ── Top bar ── */}
      <header className="flex items-center justify-between px-6 py-0 bg-white border-b border-[#F3F4F6] shrink-0" style={{ height: 60 }}>
        <div style={{ width: 220 }}>
          <a href="/">
            <img src="/logo.png" alt="DadFit" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <div>
            <p className="font-black text-[#111827] text-sm leading-none" style={{ fontFamily: 'Manrope' }}>{streak} jours</p>
            <p className="text-[10px] text-[#9CA3AF] font-semibold leading-none mt-0.5">streak</p>
          </div>
        </div>

        <div className="flex items-center gap-3" style={{ width: 220, justifyContent: 'flex-end' }}>
          <button className="relative p-2 rounded-xl hover:bg-[#F9FAFB]"><IcBell /></button>
          <div className="relative">
            <button
              onClick={() => setProfileOpen(o => !o)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#F9FAFB]"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white" style={{ background: 'linear-gradient(135deg, #22C55E, #163B2D)' }}>{initial}</div>
              <span className="text-sm font-bold text-[#111827]">{user.name}</span>
              <span className="text-[#9CA3AF] text-xs">▾</span>
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-2xl shadow-lg border border-[#F3F4F6] py-1 min-w-[160px]">
                  <div className="px-4 py-2 border-b border-[#F3F4F6]">
                    <p className="text-xs text-[#9CA3AF] truncate">{authUser?.email}</p>
                  </div>
                  <button
                    onClick={() => { setProfileOpen(false); signOut() }}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className="flex flex-col bg-white border-r border-[#F3F4F6] shrink-0 overflow-y-auto" style={{ width: 220 }}>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const active = view === id
              return (
                <button key={id} onClick={() => setView(id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                  style={{ background: active ? '#F0FDF4' : 'transparent' }}>
                  <Icon active={active} />
                  <span className="text-sm font-bold" style={{ color: active ? '#22C55E' : '#6B7280', fontFamily: 'Manrope' }}>
                    {label}
                  </span>
                </button>
              )
            })}
          </nav>

          <div className="m-3 rounded-2xl p-4" style={{ background: '#163B2D' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <span className="text-lg">👑</span>
            </div>
            <p className="font-black text-white text-sm mb-0.5" style={{ fontFamily: 'Manrope' }}>Passe à DadFit</p>
            <p className="font-black text-[#22C55E] text-sm mb-2">Premium</p>
            <p className="text-[11px] text-[#9CA3AF] leading-relaxed mb-3">
              Accès à plus de programmes, de conseils et de contenus exclusifs.
            </p>
            <button onClick={() => setView('premium')}
              className="w-full py-2 rounded-xl text-sm font-black transition-all active:scale-95"
              style={{ background: '#22C55E', color: 'white', fontFamily: 'Manrope' }}>
              Découvrir
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto">
          {view === 'dashboard'    && <Dashboard onNavigate={v => setView(v as NavView)} />}
          {view === 'seance'       && <Programme />}
          {view === 'entrainement' && <Seances />}
          {view === 'progression'  && <Progres />}
          {view === 'nutrition'    && <Nutrition />}
          {view === 'defis'        && <Defis />}
          {view === 'ressources'   && <Ressources />}
          {view === 'premium'      && <Premium />}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
