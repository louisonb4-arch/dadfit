import posthog from 'posthog-js'

const key = import.meta.env.VITE_POSTHOG_KEY as string
const host = import.meta.env.VITE_POSTHOG_HOST as string

export function initPostHog() {
  if (!key || key.includes('your_key')) return
  posthog.init(key, {
    api_host: host || 'https://app.posthog.com',
    capture_pageview: false,
    persistence: 'localStorage',
    autocapture: false,
  })
}

export function identifyUser(userId: string) {
  posthog.identify(userId) // no PII — userId only
}

export function resetUser() {
  posthog.reset()
}

export const track = {
  // ── Acquisition funnel ──────────────────────────────────
  landingViewed: (props?: { utm_source?: string; utm_campaign?: string }) =>
    posthog.capture('landing_viewed', props),

  startFreeClicked: (props?: { utm_source?: string }) =>
    posthog.capture('start_free_clicked', props),

  signupStarted: () =>
    posthog.capture('signup_started'),

  signupCompleted: (props?: { utm_source?: string; utm_campaign?: string; utm_medium?: string }) => {
    posthog.capture('signup_completed', props)
    // Uncomment when Meta Pixel script is added to index.html:
    // if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'Lead')
    // Uncomment when Google Ads gtag script is added to index.html:
    // if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'sign_up')
  },

  // ── Onboarding ──────────────────────────────────────────
  startedOnboarding: () =>
    posthog.capture('onboarding_started'),

  completedOnboarding: (props: { fitness_level?: string; main_goal?: string; age?: string }) =>
    posthog.capture('onboarding_completed', props),

  // ── Core app ────────────────────────────────────────────
  dashboardViewed: () =>
    posthog.capture('dashboard_viewed'),

  viewedPricing: () =>
    posthog.capture('viewed_pricing'),

  startedCheckout: () =>
    posthog.capture('started_checkout'),

  completedCheckout: () =>
    posthog.capture('completed_checkout'),

  workoutStarted: (props: { type: string; week: number }) =>
    posthog.capture('workout_started', props),

  workoutCompleted: (props: { type: string; duration_min?: number; energy_after?: number }) =>
    posthog.capture('workout_completed', props),

  checkinCompleted: (props: { energy_score: number; steps?: number }) =>
    posthog.capture('checkin_completed', props),

  cancelledSubscription: () =>
    posthog.capture('cancelled_subscription'),

  returnedAfterInactivity: (props: { days_inactive: number }) =>
    posthog.capture('returned_after_inactivity', props),
}
