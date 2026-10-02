import { useEffect, useEffectEvent, useRef } from 'react'

export function usePolling(
  interval: number,
  onTick: () => void | Promise<void>
) {
  const aliveRef = useRef(false)

  const onTickEvent = useEffectEvent(async () => {
    if (!aliveRef.current) return
    try {
      await onTick()
    } catch (err) {
      console.error('poll error:', err)
    }
  })

  useEffect(() => {
    aliveRef.current = true
    let timeoutId: number

    const tick = async () => {
      if (!aliveRef.current) return

      await onTickEvent()

      if (aliveRef.current) {
        timeoutId = setTimeout(tick, interval)
      }
    }

    tick()

    return () => {
      aliveRef.current = false
      clearTimeout(timeoutId)
    }
  }, [interval])
}
