const RU_COUNTRY_CODE = '7'

export function toChatId(input: string): string {
  let digits = input.replace(/\D/g, '')

  if (!digits) return ''

  if (digits.length === 11 && digits.startsWith('8')) {
    digits = RU_COUNTRY_CODE + digits.slice(1)
  }

  if (digits.length === 10) {
    digits = RU_COUNTRY_CODE + digits
  }

  return `${digits}@c.us`
}

export function toPhone(chatId: string): string {
  return chatId.replace('@c.us', '')
}
