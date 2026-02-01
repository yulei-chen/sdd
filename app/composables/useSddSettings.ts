import { useStorage } from '@vueuse/core'

const LOCALE_TO_CURRENCY: Record<string, string> = {
  'en-US': 'USD',
  'en-GB': 'GBP',
  'de': 'EUR',
  'de-DE': 'EUR',
  'fr': 'EUR',
  'fr-FR': 'EUR',
  'ja': 'JPY',
  'ja-JP': 'JPY',
  'zh-CN': 'CNY',
  'zh-TW': 'TWD',
  'es': 'EUR',
  'es-ES': 'EUR',
  'it': 'EUR',
  'it-IT': 'EUR',
  'pt-BR': 'BRL',
  'ko-KR': 'KRW',
  'en-AU': 'AUD',
  'en-CA': 'CAD',
}

function getDefaultCurrency(): string {
  if (typeof navigator === 'undefined') return 'USD'
  const locale = navigator.language ?? navigator.languages?.[0] ?? 'en-US'
  const exact = LOCALE_TO_CURRENCY[locale]
  if (exact) return exact
  const lang = locale.split('-')[0]
  return LOCALE_TO_CURRENCY[lang] ?? 'USD'
}

export function useSddSettings() {
  const currency = useStorage('sdd-currency', getDefaultCurrency(), undefined, { initOnMounted: true })
  const dailyPay = useStorage('sdd-daily-pay', 0, undefined, { initOnMounted: true })
  const startTime = useStorage('sdd-start-time', '09:00', undefined, { initOnMounted: true })
  const endTime = useStorage('sdd-end-time', '17:00', undefined, { initOnMounted: true })

  return {
    currency,
    dailyPay,
    startTime,
    endTime,
  }
}
