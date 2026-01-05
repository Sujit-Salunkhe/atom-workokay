// useThemePortal.ts
import { useEffect, useState } from 'react'

export function useThemePortal() {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const app_root = document.getElementById('app-root')
    if (app_root) {
      setContainer(document.getElementById('app-root'))
    }
  }, [])

  return container
}
