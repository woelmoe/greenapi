import type { IMessage } from '.'

export interface IChat {
  chatId: string
  phone: string
  messages: IMessage[]
}
