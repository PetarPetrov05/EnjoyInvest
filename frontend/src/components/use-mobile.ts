'use client'
import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler)
    } else {
      // @ts-ignore
      mql.addListener(handler)
    }

    setIsMobile(mql.matches)
    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', handler)
      } else {
        // @ts-ignore
        mql.removeListener(handler)
      }
    }
  }, [breakpoint])

  return isMobile
}