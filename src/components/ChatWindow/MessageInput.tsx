import { useState, type SubmitEvent, type KeyboardEvent } from 'react'
import { Box, TextField, IconButton, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import type { ICredentials, IMessage } from '../../types'
import { sendMessage } from '../../api/api'
import { ThemeColors } from '../../theme'

interface MessageInputProps {
  chatId: string
  creds: ICredentials
  onMessageSent: (message: IMessage) => void
}

function MessageInput({ chatId, creds, onMessageSent }: MessageInputProps) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async (): Promise<void> => {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    setSending(true)
    setText('')

    try {
      const response = await sendMessage(creds.id, {
        chatId,
        message: trimmed,
        token: creds.token
      })

      onMessageSent({
        chatId,
        id: response.idMessage,
        text: trimmed,
        isOut: true,
        timestamp: Date.now()
      })
    } catch (err) {
      console.error('Ошибка отправки:', err)
      setText(trimmed)
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    handleSend()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        px: 1.5,
        backgroundColor: ThemeColors.headerBg,
        borderTop: `1px solid ${ThemeColors.border}`
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={5}
        placeholder='Введите сообщение'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={sending}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  type='submit'
                  disabled={!text.trim() || sending}
                  sx={{ color: ThemeColors.primary }}
                  title='Отправить'
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: ThemeColors.sidebarBg,
            borderRadius: 3,
            '& fieldset': { borderColor: ThemeColors.border },
            '&:hover fieldset': { borderColor: ThemeColors.textMuted },
            '&.Mui-focused fieldset': { borderColor: ThemeColors.primary }
          }
        }}
      />
    </Box>
  )
}

export default MessageInput
