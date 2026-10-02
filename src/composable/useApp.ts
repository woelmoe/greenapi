import { useState } from 'react'
import type { ICredentials } from '../types'

export function useAppLogin() {
  const [creds, setCreds] = useState<ICredentials | null>(null)

  const login = (value: ICredentials) => setCreds(value)
  const logout = () => setCreds(null)

  return {
    creds,
    isAuth: creds !== null,
    login,
    logout
  }
}
