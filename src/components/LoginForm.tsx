import { useState, type SubmitEvent } from 'react'
import { AuthState, type ICredentials } from '../types'
import { checkAuth } from '../api/api'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { ThemeColors } from '../theme'

interface IProps {
  onLogin: (creds: ICredentials) => void
}

function LoginForm({ onLogin }: IProps) {
  const [idInstance, setIdInstance] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    setLoading(true)

    e.preventDefault()
    setError('')

    try {
      const data = await checkAuth(idInstance, token)
      if (data.stateInstance === AuthState.authorized) {
        onLogin({
          id: idInstance,
          token
        })
      }
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${ThemeColors.headerBg} 0%, ${ThemeColors.primaryDark} 100%)`,
        p: 2
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 420,
          backgroundColor: ThemeColors.loginCardBg,
          borderRadius: 3
        }}
      >
        <Typography
          variant='h5'
          align='center'
          sx={{ color: ThemeColors.primary, mb: 3, fontWeight: 700 }}
        >
          Авторизация
        </Typography>

        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label='Идентификатор инстанса'
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            fullWidth
          />
          <TextField
            type='password'
            label='Токен авторизации'
            value={token}
            onChange={(e) => setToken(e.target.value)}
            fullWidth
          />

          {error && <Alert severity='error'>{error}</Alert>}

          <Button
            type='submit'
            variant='contained'
            size='large'
            disabled={loading}
            fullWidth
            startIcon={
              loading ? <CircularProgress size={18} color='inherit' /> : null
            }
            sx={{ mt: 1, py: 1.4 }}
          >
            {loading ? 'Проверка...' : 'Войти'}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginForm
