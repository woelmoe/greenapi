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

export interface IMessageResponse {
  idMessage: string
}
