import { supabase } from './supabase'
import { track } from './posthog'

export const stripeEnabled = import.meta.env.VITE_STRIPE_ENABLED === 'true'

export async function startCheckout(): Promise<void> {
  if (!stripeEnabled) throw new Error('Stripe is not enabled yet.')

  track.startedCheckout()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Must be logged in to checkout')

  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      success_url: `${import.meta.env.VITE_APP_URL || window.location.origin}/?payment=success`,
      cancel_url: `${import.meta.env.VITE_APP_URL || window.location.origin}/?payment=cancelled`,
    },
  })

  if (error) throw error
  if (data?.url) {
    window.location.href = data.url
  }
}

export function isPaymentSuccess(): boolean {
  return new URLSearchParams(window.location.search).get('payment') === 'success'
}

export function clearPaymentParam() {
  const url = new URL(window.location.href)
  url.searchParams.delete('payment')
  window.history.replaceState({}, '', url.toString())
}
