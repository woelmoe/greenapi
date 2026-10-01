import { Box } from '@mui/material'
import type { ICredentials } from '../../types'
import { ThemeColors } from '../../theme'

function ChatWindow() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: ThemeColors.chatBg
      }}
    >
      <Box>Список чатов</Box>
      <Box>Окно чата</Box>
    </Box>
  )
}

export default ChatWindow
