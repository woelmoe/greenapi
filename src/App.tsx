import { useAppLogin } from './composable/useApp'
import LoginForm from './components/LoginForm'
import ChatWindow from './components/ChatWindow/ChatWindow'

function App() {
  const { isAuth, creds, login, logout } = useAppLogin()

  if (!isAuth || !creds) {
    return <LoginForm onLogin={login} />
  }
  return <ChatWindow creds={creds} onLogout={logout} />
}

export default App
