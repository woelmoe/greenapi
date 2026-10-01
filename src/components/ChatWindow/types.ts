import type { IMessage } from '../../types'

export interface IChat {
  chatId: string
  phone: string
  messages: IMessage[]
}
