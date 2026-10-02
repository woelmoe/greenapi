import axios from 'axios'
import type { AuthState, IMessageResponse } from '../types'
import {
  mockCheckAuth,
  mockSendMessage,
  mockReceiveNotification,
  mockDeleteNotification
} from './mockNotifications'
import type { INotificationResponse } from '../types/notification'
import type { IGetChatHistoryResponse } from '../types/history'

const BASE_URL = 'https://api.green-api.com'

// мне пришлось замокать api, потому что вотсап постоянно отваливался
// ps: я понял в чем дело. нужно было включить в настройках пункт
// Получать уведомления о входящих сообщениях и файлах

// const USE_MOCK = true
const USE_MOCK = false

export async function checkAuth(
  id: string,
  token: string
): Promise<{ stateInstance: AuthState }> {
  if (USE_MOCK) return mockCheckAuth()

  const url = `${BASE_URL}/waInstance${id}/getStateInstance/${token}`
  const { data } = await axios.get(url)
  return data
}

export async function sendMessage(
  id: string,
  data: { message: string; token: string; chatId: string }
): Promise<IMessageResponse> {
  if (USE_MOCK) return mockSendMessage()

  const { chatId, message } = data
  const url = `${BASE_URL}/waInstance${id}/sendMessage/${data.token}`
  const response = await axios.post(url, { chatId, message })
  return response.data
}

export async function receiveNotification(
  instanceId: string,
  token: string
): Promise<INotificationResponse | null> {
  if (USE_MOCK) return mockReceiveNotification()

  const url = `${BASE_URL}/waInstance${instanceId}/receiveNotification/${token}`
  const { data } = await axios.get(url)
  return data
}

export async function deleteNotification(
  instanceId: string,
  token: string,
  receiptId: number
) {
  if (USE_MOCK) {
    mockDeleteNotification()
    return
  }

  const url = `${BASE_URL}/waInstance${instanceId}/deleteNotification/${token}/${receiptId}`
  await axios.delete(url)
}

export async function getChatHistory(
  id: string,
  token: string,
  chatId: string,
  count = 100
): Promise<IGetChatHistoryResponse[]> {
  const url = `${BASE_URL}/waInstance${id}/getChatHistory/${token}`
  const { data } = await axios.post(url, { chatId, count })
  return data
}
