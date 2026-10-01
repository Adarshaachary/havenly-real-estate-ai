import { request } from './api'

export async function sendMessage(message) {
  if (!message?.trim()) {
    throw new Error('Message is required.')
  }

  const result = await request('/chat', {
    method: 'POST',
    body: JSON.stringify({
      message: message.trim(),
    }),
  })

  return {
    reply:
      result?.reply ||
      'I could not find a clear answer just yet.',

    properties: Array.isArray(result?.properties)
      ? result.properties
      : [],

    count: result?.count || 0,
  }
}