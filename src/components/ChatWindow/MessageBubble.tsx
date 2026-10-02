import { Box, Typography } from '@mui/material'
import type { IMessage } from '../../types'
import { ThemeColors } from '../../theme'

interface MessageBubbleProps {
  message: IMessage
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.isOutgoing ? 'flex-end' : 'flex-start',
        mb: 0.5
      }}
    >
      <Box
        sx={{
          maxWidth: '65%',
          px: 1.5,
          py: 1,
          borderRadius: 2,
          backgroundColor: message.isOutgoing
            ? ThemeColors.outgoingBubble
            : ThemeColors.incomingBubble,
          color: ThemeColors.textPrimary,
          boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
          wordBreak: 'break-word'
        }}
      >
        <Typography sx={{ fontSize: 14.5, lineHeight: 1.4 }}>
          {message.text}
        </Typography>
        <Typography
          sx={{
            fontSize: 11,
            color: ThemeColors.textMuted,
            textAlign: 'right',
            mt: 0.5
          }}
        >
          {formatTime(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  )
}

export default MessageBubble
