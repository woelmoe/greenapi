import axios from 'axios'
import type {
  IMessageResponse,
  INotificationResponse,
  IStateInstanceResponse
} from '../types'

const BASE_URL = 'https://api.green-api.com'

export async function checkAuth(
  id: string,
  token: string
): Promise<{ stateInstance: IStateInstanceResponse }> {
  const url = `${BASE_URL}/waInstance${id}/getStateInstance/${token}`
  const { data } = await axios.get(url)
  return data
}

export async function sendMessage(
  id: string,
  data: {
    message: string
    token: string
    chatId: string
  }
): Promise<IMessageResponse> {
  const { chatId, message } = data
  const url = `${BASE_URL}/waInstance${id}/sendMessage/${data.token}`
  const response = await axios.post<IMessageResponse>(url, {
    chatId,
    message
  })
  return response.data
}

export async function receiveNotification(instanceId: string, token: string) {
  const url = `${BASE_URL}/waInstance${instanceId}/receiveNotification/${token}`
  const { data } = await axios.get<INotificationResponse | null>(url)
  return data
}

export async function deleteNotification(
  instanceId: string,
  token: string,
  receiptId: string
) {
  const url = `${BASE_URL}/waInstance${instanceId}/deleteNotification/${token}/${receiptId}`
  await axios.delete(url)
}
