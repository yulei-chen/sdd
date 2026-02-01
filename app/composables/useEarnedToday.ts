import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import type { Ref } from 'vue'

const LERP_SPEED = 0.09
const SNAP_THRESHOLD = 0.001

function parseTimeToSeconds(hhmm: string): number {
  const parts = hhmm.split(':').map(Number)
  const h = parts[0] ?? 0
  const m = parts[1] ?? 0
  if (Number.isNaN(h) || Number.isNaN(m)) return 0
  return h * 3600 + m * 60
}

function nowSecondsToday(): number {
  const now = new Date()
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
}

export function useEarnedToday(
  dailyPay: Ref<number>,
  startTime: Ref<string>,
  endTime: Ref<string>,
  currency: Ref<string>
) {
  const earned = ref(0)
  const displayEarned = ref(0)
  let rafId: number | null = null

  function compute() {
    if (typeof window === 'undefined') return
    const startSeconds = parseTimeToSeconds(startTime.value)
    const endSeconds = parseTimeToSeconds(endTime.value)
    if (startSeconds >= endSeconds) {
      earned.value = 0
      displayEarned.value = 0
      return
    }
    const workSeconds = endSeconds - startSeconds
    const ratePerSecond = dailyPay.value / workSeconds
    const now = nowSecondsToday()
    const elapsedSeconds = Math.max(0, Math.min(now, endSeconds) - startSeconds)
    earned.value = elapsedSeconds * ratePerSecond
  }

  function tick() {
    const target = earned.value
    const current = displayEarned.value
    const diff = target - current
    if (Math.abs(diff) < SNAP_THRESHOLD) {
      displayEarned.value = target
    } else {
      displayEarned.value = current + diff * LERP_SPEED
    }
    rafId = requestAnimationFrame(tick)
  }

  const formatter = computed(() => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.value,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  })

  const formattedEarned = computed(() => formatter.value.format(displayEarned.value))

  const { pause, resume } = useIntervalFn(compute, 1000, { immediate: false })

  onMounted(() => {
    compute()
    displayEarned.value = earned.value
    resume()
    rafId = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    pause()
    if (rafId !== null) cancelAnimationFrame(rafId)
  })

  watch([dailyPay, startTime, endTime], () => {
    compute()
    if (earned.value === 0) displayEarned.value = 0
  })

  return {
    earned,
    formattedEarned,
    formatter,
  }
}
