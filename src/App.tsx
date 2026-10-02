import LoginForm from './components/LoginForm'
import ChatWindow from './components/ChatWindow/ChatWindow'
import type { ICredentials } from './types'
import { useState } from 'react'

function App() {
  const [creds, setCreds] = useState<ICredentials | null>(null)

  const login = (value: ICredentials) => setCreds(value)
  const logout = () => setCreds(null)
  const isAuth = creds !== null

  if (!isAuth || !creds) {
    return <LoginForm onLogin={login} />
  }
  return <ChatWindow creds={creds} onLogout={logout} />
}

export default App
