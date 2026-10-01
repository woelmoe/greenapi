import { useCallback, useMemo, useState } from 'react'
import type { ICredentials } from '../types'

export function useAppLogin() {
  const [creds, setCreds] = useState<ICredentials | null>(null)

  const login = useCallback((creds: ICredentials) => {
    // console.log(creds)
    setCreds(creds)
  }, [])

  const logout = useCallback(() => {
    setCreds(null)
  }, [])

  return useMemo(
    () => ({
      creds,
      isAuth: creds !== null,
      login,
      logout
    }),
    [creds, login, logout]
  )
}
