export enum AuthState {
  authorized = 'authorized'
}

export interface ICredentials {
  id: string
  token: string
}

export interface IMessage {
  id: string
  text: string
  isOut: boolean
  timestamp: number
  chatId: string
}

export type IStateInstanceResponse =
  | 'authorized'
  | 'notAuthorized'
  | 'blocked'
  | 'starting'
  | 'yellowCard'
  | 'sleepMode'

export interface INotificationResponse {
  receiptId: number
  body: {
    typeWebhook: string
    senderData?: {
      chatId: string
      sender: string
      senderName?: string
    }
    messageData?: {
      typeMessage: string
      textMessageData?: {
        textMessage: string
      }
    }
    idMessage?: string
    timestamp?: number
  } | null
}

export interface IMessageResponse {
  idMessage: string
}
