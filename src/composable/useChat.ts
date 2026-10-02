import { useState } from 'react'
import type { ICredentials, IMessage, INotificationResponse } from '../types'
import type { IChat } from '../types/chats'
import { deleteNotification, receiveNotification } from '../api/api'
import { usePolling } from './usePolling'
import { toChatId } from '../utils/parsePhone'

const INTER_POLL = 3000

export function useChat(creds: ICredentials) {
  const [chats, setChats] = useState<IChat[]>([])
  const [activeChatId, setActiveChatId] = useState<string>('')

  const setActiveChat = (chatId: string) => {
    setActiveChatId(chatId)
  }

  const createChat = (phone: string) => {
    const chatId = toChatId(phone)
    if (!chatId) return

    setChats((prev) => {
      const found = prev.find((c) => c.chatId === chatId)
      if (found) return prev
      return [
        ...prev,
        { chatId, phone: chatId.replace('@c.us', ''), messages: [] }
      ]
    })

    setActiveChatId(chatId)
  }

  const addMessage = (chatId: string, message: IMessage) => {
    const updateChat = (chat: IChat) =>
      chat.chatId === chatId
        ? { ...chat, messages: [...chat.messages, message] }
        : chat

    setChats((prev) => prev.map(updateChat))
  }

  const addIncoming = (chatId: string, message: IMessage) => {
    const phone = chatId.replace('@c.us', '')

    setChats((prev) => {
      const exists = prev.some((c) => c.chatId === chatId)
      const base = exists ? prev : [...prev, { chatId, phone, messages: [] }]

      return base.map((chat) =>
        chat.chatId === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    })
  }

  const toMessage = (notification: INotificationResponse): IMessage | null => {
    const { body } = notification
    if (body?.typeWebhook !== 'incomingMessageReceived') return null

    const chatId = body.senderData?.chatId ?? ''
    const text = body.messageData?.textMessageData?.textMessage ?? ''

    if (!chatId || !text) return null

    return {
      id: body.idMessage ?? crypto.randomUUID(),
      text,
      isOut: false,
      timestamp: (body.timestamp ?? Date.now() / 1000) * 1000,
      chatId
    }
  }

  const poll = async () => {
    const notification = await receiveNotification(creds.id, creds.token)
    if (!notification) return

    const message = toMessage(notification)
    if (message) addIncoming(message.chatId, message)

    await deleteNotification(creds.id, creds.token, notification.receiptId)
  }

  usePolling(INTER_POLL, poll)

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
