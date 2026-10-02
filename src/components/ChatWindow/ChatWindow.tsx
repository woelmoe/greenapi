import { Box, Paper } from '@mui/material'
import { ThemeColors } from '../../theme'
import { useChat } from '../../composable/useChat'
import type { ICredentials } from '../../types'
import ChatList from './ChatList'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

interface IProps {
  creds: ICredentials
  onLogout: () => void
}

function ChatWindow({ creds, onLogout }: IProps) {
  const {
    chats,
    activeChatId,
    createChat,
    activeChat,
    setActiveChat,
    addMessage
  } = useChat(creds)

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: ThemeColors.appBg,
        p: { xs: 0, md: 3 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: 1200,
          borderRadius: { xs: 0, md: 2 },
          overflow: 'hidden',
          border: `1px solid ${ThemeColors.border}`
        }}
      >
        <Box
          sx={{
            width: 400,
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: ThemeColors.sidebarBg,
            borderRight: `1px solid ${ThemeColors.border}`
          }}
        >
          <ChatList
            chats={chats}
            activeChatId={activeChatId}
            idInstance={creds.id}
            onCreateChat={createChat}
            onSelectChat={setActiveChat}
            onLogout={onLogout}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: ThemeColors.sidebarBg
          }}
        >
          {activeChat ? (
            <>
              <ChatHeader chat={activeChat} />
              <MessageList messages={activeChat.messages} />
              <MessageInput
                chatId={activeChat.chatId}
                creds={creds}
                onMessageSent={(msg) => addMessage(activeChat.chatId, msg)}
              />
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: ThemeColors.textMuted,
                flexDirection: 'column',
                gap: 2,
                p: 4,
                textAlign: 'center'
              }}
            >
              <Box sx={{ fontSize: 28, fontWeight: 300 }}>
                Выберите чат слева
              </Box>
              <Box sx={{ fontSize: 14, maxWidth: 400 }}>
                Или создайте новый, введя номер получателя.
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default ChatWindow
