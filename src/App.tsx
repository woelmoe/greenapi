import { useAppLogin } from './composable/useApp'
import LoginForm from './components/LoginForm'
import ChatWindow from './components/ChatWindow/ChatWindow'

function App() {
  const { isAuth, creds, login } = useAppLogin()

  if (!isAuth || !creds) {
    return <LoginForm onLogin={login} />
  }
  return <ChatWindow />
}

export default App
