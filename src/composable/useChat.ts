import { useCallback, useState } from 'react'
import type { IMessage } from '../types'
import type { IChat } from '../components/ChatWindow/types'

export function useChat() {
  const [chats, setChats] = useState<IChat[]>([])
  const [activeChatId, setActiveChatId] = useState<string>('')

  const setActiveChat = useCallback((chatId: string) => {
    setActiveChatId(chatId)
  }, [])

  const createChat = useCallback(
    (phone: string) => {
      const chatId = phone + '@c.us'

      setChats((prev) => {
        const foundChat = prev.find((c) => c.chatId === chatId)
        if (foundChat) {
          setActiveChatId(chatId)
          return prev
        }

        const newChat: IChat = {
          chatId,
          phone,
          messages: []
        }
        setActiveChat(chatId)
        return [...prev, newChat]
      })
    },
    [setActiveChat]
  )

  const addMessage = useCallback((chatId: string, message: IMessage) => {
    const updateChat = (chat: IChat) =>
      chat.chatId === chatId
        ? { ...chat, messages: [...chat.messages, message] }
        : chat

    setChats((prev) => prev.map(updateChat))
  }, [])

  const activeChat = chats.find((c) => c.chatId === activeChatId) ?? null

  return {
    chats,
    activeChatId,
    activeChat,
    createChat,
    setActiveChat,
    addMessage
  }
}
