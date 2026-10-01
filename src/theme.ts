import { createTheme } from '@mui/material/styles'

export const ThemeColors = {
  primary: '#00a884',
  primaryDark: '#008f72',
  headerBg: '#202c33',
  sidebarBg: '#111b21',
  chatBg: '#0b141a',
  incomingBubble: '#202c33',
  outgoingBubble: '#005c4b',
  textPrimary: '#e9edef',
  textSecondary: '#8696a0',
  border: '#2a3942',
  hoverBg: '#202c33',
  loginBg: '#111b21',
  loginCardBg: '#202c33'
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: ThemeColors.primary,
      dark: ThemeColors.primaryDark
    },
    background: {
      default: ThemeColors.chatBg,
      paper: ThemeColors.sidebarBg
    },
    text: {
      primary: ThemeColors.textPrimary,
      secondary: ThemeColors.textSecondary
    },
    divider: ThemeColors.border
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8
          }
        }
      }
    }
  }
})
