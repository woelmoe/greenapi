import { createTheme } from '@mui/material/styles'

export const ThemeColors = {
  primary: '#57ac5a',
  primaryDark: '#227826',
  accent: '#00a884',

  appBg: '#f0f2f5',
  sidebarBg: '#ffffff',
  chatBg: '#efeae2',
  headerBg: '#f0f2f5',
  cardBg: '#ffffff',

  outgoingBubble: '#d9fdd3',
  incomingBubble: '#ffffff',

  textPrimary: '#111b21',
  textSecondary: '#667781',
  textMuted: '#8696a0',

  border: '#e9edef',
  hoverBg: '#f5f6f6',
  selectedBg: '#f0f2f5'
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: ThemeColors.primary,
      dark: ThemeColors.primaryDark
    },
    background: {
      default: ThemeColors.appBg,
      paper: ThemeColors.cardBg
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
    }
  }
})
