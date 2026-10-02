import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import MessageBubble from './MessageBubble'
import type { IMessage } from '../../types'
import { ThemeColors } from '../../theme'

interface MessageListProps {
  messages: IMessage[]
}

function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: 3,
        backgroundColor: ThemeColors.appBg
      }}
    >
      <>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </>
    </Box>
  )
}

export default MessageList
