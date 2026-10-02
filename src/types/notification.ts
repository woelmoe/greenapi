export interface INotificationResponse {
  receiptId: number
  body: INotificationBody
}

export interface INotificationBody {
  typeWebhook:
    | 'incomingMessageReceived'
    | 'outgoingMessageReceived'
    | 'outgoingAPIMessageReceived'
    | 'outgoingMessageStatus'
    | 'stateInstanceChanged'
    | 'deviceInfo'
    | string

  instanceData: {
    idInstance: number
    wid: string
    typeInstance: string
  }

  timestamp: number
  idMessage: string
  senderData?: ISenderData
  messageData?: IMessageData
  statusData?: IStatusData
}

export interface ISenderData {
  chatId: string
  chatName?: string
  chatType?: 'user' | 'group'
  sender: string
  senderName?: string
  senderType?: string
  senderContactName?: string
  senderPhoneNumber?: number
}

export interface IMessageData {
  typeMessage: 'textMessage' | 'extendedTextMessage' | 'imageMessage' | string
  textMessageData?: {
    textMessage: string
  }
  extendedTextMessageData?: {
    text: string
    description?: string
  }
}

export interface IStatusData {
  idMessage: string
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'suspended' | string
  timestamp: number
  description?: string
}
