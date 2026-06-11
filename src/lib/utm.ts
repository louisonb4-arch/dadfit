const UTM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', // Meta Ads click ID
  'gclid',  // Google Ads click ID
] as const
const LS_KEY = 'dadfit_utm'

export type UTMParams = Partial<Record<typeof UTM_KEYS[number], string>>

export function captureUTMs(): UTMParams {
  const params = new URLSearchParams(window.location.search)
  const fresh: UTMParams = {}

  UTM_KEYS.forEach(key => {
    const val = params.get(key)
    if (val) fresh[key] = val
  })

  // Only overwrite stored UTMs when new ones are present in the URL.
  // Protects against navigation stripping params before signup.
  if (Object.keys(fresh).length > 0) {
    localStorage.setItem(LS_KEY, JSON.stringify(fresh))
    return fresh
  }

  return getStoredUTMs()
}

export function getStoredUTMs(): UTMParams {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export function clearUTMs() {
  localStorage.removeItem(LS_KEY)
}
