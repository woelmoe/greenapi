import { AuthState, type IMessageResponse } from '../types'
import type { INotificationResponse } from '../types/notification'

let notificationCounter = 1

const phonePool = ['79999999999', '79123456789', '79001112233']

const textPool = [
  'привет',
  'как дела?',
  'выавывыавыа',
  'лывалдвыалдвыадвыадолв',
  '123123123?',
  'спасибо!',
  'хорошо',
  '1111111111111111111111111'
]

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export async function mockCheckAuth(): Promise<{
  stateInstance: AuthState
}> {
  await new Promise((r) => setTimeout(r, 500))
  const state = AuthState.authorized
  return { stateInstance: state }
}

export async function mockSendMessage(): Promise<IMessageResponse> {
  await new Promise((r) => setTimeout(r, 200))
  return {
    idMessage: `mock-sent-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  }
}

export function mockReceiveNotification(): INotificationResponse | null {
  if (Math.random() < 0.7) return null

  const phone = randomFrom(phonePool)
  const text = randomFrom(textPool)
  const chatId = `${phone}@c.us`

  const receiptId = notificationCounter++
  const idMessage = `mock-${receiptId}-${Date.now()}`

  return {
    receiptId,
    body: {
      typeWebhook: 'incomingMessageReceived',
      instanceData: {
        idInstance: 0,
        wid: '70000000000@c.us',
        typeInstance: 'whatsapp'
      },
      senderData: {
        chatId,
        sender: chatId
      },
      messageData: {
        typeMessage: 'textMessage',
        textMessageData: { textMessage: text }
      },
      idMessage,
      timestamp: Math.floor(Date.now() / 1000)
    }
  }
}

export function mockDeleteNotification(): void {
  //
}
