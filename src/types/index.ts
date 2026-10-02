export enum AuthState {
  authorized = 'authorized',
  suspended = 'suspended'
}

export interface ICredentials {
  id: string
  token: string
}

export interface IMessage {
  id: string
  text: string
  isOutgoing: boolean
  timestamp: number
  chatId: string
}

export interface IMessageResponse {
  idMessage: string
}
