export interface IGetChatHistoryResponse {
  type: 'outgoing' | 'incoming'
  idMessage: string
  timestamp: number
  typeMessage:
    | 'textMessage'
    | 'extendedTextMessage'
    | 'imageMessage'
    | 'videoMessage'
    | 'documentMessage'
    | 'audioMessage'
    | 'stickerMessage'
    | 'locationMessage'
    | 'contactMessage'
    | 'contactsArrayMessage'
    | 'reactionMessage'
    | 'pollMessage'
    | 'pollUpdateMessage'
  chatId: string
  chatType?: 'user' | 'group' | 'supergroup' | 'channel' | 'bot'
  textMessage?: string
  statusMessage?: 'pending' | 'sent' | 'delivered' | 'read'
  sendByApi?: boolean
  downloadUrl?: string
  caption?: string
  senderName?: string
  senderId?: string
  senderContactName?: string
}
