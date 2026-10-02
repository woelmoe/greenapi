import { useState, type SubmitEvent } from 'react'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import AddIcon from '@mui/icons-material/Add'
import type { IChat } from '../../types/chats'
import { ThemeColors } from '../../theme'

interface IProps {
  chats: IChat[]
  activeChatId: string | null
  idInstance: string
  onCreateChat: (phone: string) => void
  onSelectChat: (chatId: string) => void
  onLogout: () => void
}

function ChatList({
  chats,
  activeChatId,
  onCreateChat,
  onSelectChat,
  onLogout
}: IProps) {
  const [newPhone, setNewPhone] = useState('')

  const handleAddChat = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = newPhone.trim()
    if (!trimmed) return
    onCreateChat(trimmed)
    setNewPhone('')
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          backgroundColor: ThemeColors.cardBg,
          borderBottom: `1px solid ${ThemeColors.border}`
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Чаты</Typography>

        <IconButton
          onClick={onLogout}
          size='small'
          sx={{ color: ThemeColors.textSecondary }}
          title='Выйти'
        >
          <LogoutIcon fontSize='small' />
        </IconButton>
      </Box>

      <Box
        component='form'
        onSubmit={handleAddChat}
        sx={{ p: 2, backgroundColor: ThemeColors.cardBg }}
      >
        <TextField
          fullWidth
          size='small'
          placeholder='Номер телефона'
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <Box
                    sx={{
                      fontSize: 12,
                      color: ThemeColors.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      pr: 1
                    }}
                  >
                    @c.us
                  </Box>
                  <IconButton
                    type='submit'
                    size='small'
                    disabled={!newPhone.trim()}
                    sx={{
                      color: ThemeColors.primary,
                      '&:disabled': { color: ThemeColors.textMuted }
                    }}
                    title='Создать чат'
                  >
                    <AddIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: ThemeColors.sidebarBg,
              borderRadius: 1.5,
              '& fieldset': { borderColor: ThemeColors.border },
              '&:hover fieldset': { borderColor: ThemeColors.textMuted },
              '&.Mui-focused fieldset': { borderColor: ThemeColors.primary }
            },
            '& input': {
              fontSize: 14,
              color: ThemeColors.textPrimary,
              '&::placeholder': {
                color: ThemeColors.textMuted,
                opacity: 1
              }
            }
          }}
        />
      </Box>

      <Divider sx={{ borderColor: ThemeColors.border }} />

      <List
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 0,
          backgroundColor: ThemeColors.cardBg
        }}
      >
        {chats.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              color: ThemeColors.textMuted
            }}
          >
            <Typography variant='body2' sx={{ fontSize: 13 }}>
              Пока нет чатов.
            </Typography>
            <Typography
              variant='body2'
              sx={{ fontSize: 12, mt: 0.5, opacity: 0.7 }}
            >
              Введите номер выше и нажмите «+»
            </Typography>
          </Box>
        ) : (
          chats.map((chat) => {
            const lastMessage = chat.messages[chat.messages.length - 1]
            const isActive = chat.chatId === activeChatId

            return (
              <ListItemButton
                key={chat.chatId}
                selected={isActive}
                onClick={() => onSelectChat(chat.chatId)}
                sx={{
                  borderBottom: `1px solid ${ThemeColors.border}`,
                  py: 1.5,
                  px: 2,
                  '&.Mui-selected': {
                    backgroundColor: ThemeColors.selectedBg
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: ThemeColors.selectedBg
                  },
                  '&:hover': {
                    backgroundColor: ThemeColors.hoverBg
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: ThemeColors.primary,
                      width: 44,
                      height: 44
                    }}
                  >
                    {chat.phone.slice(-2)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  sx={{ ml: 1 }}
                  primary={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: ThemeColors.textPrimary
                        }}
                      >
                        +{chat.phone}
                      </Typography>
                      {lastMessage && (
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: ThemeColors.textMuted
                          }}
                        >
                          {new Date(lastMessage.timestamp).toLocaleTimeString(
                            'ru-RU',
                            {
                              hour: '2-digit',
                              minute: '2-digit'
                            }
                          )}
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography
                      noWrap
                      component='span'
                      sx={{
                        fontSize: 13,
                        color: ThemeColors.textSecondary,
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        mt: 0.25
                      }}
                    >
                      {lastMessage
                        ? `${lastMessage.isOutgoing ? '✓ ' : ''}${lastMessage.text}`
                        : 'Нет сообщений'}
                    </Typography>
                  }
                />
              </ListItemButton>
            )
          })
        )}
      </List>
    </>
  )
}

export default ChatList
