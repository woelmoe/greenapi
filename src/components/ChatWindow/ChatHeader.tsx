import { Box, Avatar, Typography } from '@mui/material'
import type { IChat } from '../../types/chats'
import { ThemeColors } from '../../theme'

interface ChatHeaderProps {
  chat: IChat
}

function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1.5,
        backgroundColor: ThemeColors.headerBg,
        borderBottom: `1px solid ${ThemeColors.border}`,
        minHeight: 62
      }}
    >
      <Avatar sx={{ bgcolor: ThemeColors.primary }}>
        {chat.phone.slice(-2)}
      </Avatar>
      <Box>
        <Typography
          sx={{ fontSize: 15, fontWeight: 600, color: ThemeColors.textPrimary }}
        >
          +{chat.phone}
        </Typography>
        <Typography sx={{ fontSize: 12, color: ThemeColors.textMuted }}>
          {chat.chatId}
        </Typography>
      </Box>
    </Box>
  )
}

export default ChatHeader
