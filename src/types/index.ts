export interface User {
  id: string
  name: string
  goals: { steps: number; waterL: number; bedtime: string }
  startDate: string // YYYY-MM-DD
  weightCurrent: number // kg
  weightTarget: number  // kg
  waistCm?: number
  programDays: number   // total program length
  age?: string
  numberOfKids?: number
  fitnessLevel?: 'beginner' | 'some_experience' | 'regular'
  mainGoal?: string
  painAreas?: string[]
}

export interface OnboardingProfile {
  name: string
  age?: string
  numberOfKids?: number
  fitnessLevel?: 'beginner' | 'some_experience' | 'regular'
  mainGoal?: string
  painAreas?: string[]
  weightKg?: number
  waistCm?: number
  consentDataHealth: boolean
}

export interface FitnessTest {
  id: string
  userId: string
  testedAt: string // YYYY-MM-DD
  pushups?: number
  squats?: number
  plankSeconds?: number
  source: 'manual'
}

export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete' | 'none'

export type TrialStatus = 'active' | 'expired' | 'none'

export interface CheckIn {
  id: string
  userId: string
  date: string // YYYY-MM-DD
  energy: number // 1-10
  sleptWell: boolean
  joints: 'good' | 'stiff' | 'pain'
  steps: number
  waterL: number
  bedtimeOK: boolean
  weight?: number // optional daily weigh-in
}

export interface Exercise {
  id: string
  name: string
  setsDone: number
  setsTarget: number
  reps: string
  cues: string[]
}

export interface SessionLog {
  id: string
  userId: string
  date: string
  type: 'A' | 'B' | 'C' | 'D'
  exercises: Exercise[]
  status: 'completed' | 'partial' | 'skipped'
  energyAfter?: number
  durationMin?: number
  difficultyFelt?: number
  painLevel?: 'none' | 'light' | 'strong'
}

export interface WeeklyScore {
  weekStart: string
  training: number   // 0-40
  walk: number       // 0-25
  hydration: number  // 0-20
  sleep: number      // 0-15
  total: number      // 0-100
  vsLastWeek: number
}

export interface Milestone {
  id: string
  triggerSessions: number
  label: string
  emoji: string
  unlocked: boolean
}

export type View = 'dashboard' | 'seance' | 'progression'
