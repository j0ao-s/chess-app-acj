import AsyncStorage from '@react-native-async-storage/async-storage'

// Android emulator: use 'http://10.0.2.2:3000'
// Physical device: use your machine's LAN IP, e.g. 'http://192.168.1.X:3000'
export const API_URL = 'http://localhost:3000'

async function request(path: string, options: RequestInit = {}) {
  const token = await AsyncStorage.getItem('token')

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as object | undefined),
    },
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.error || 'Erro desconhecido')

  return data
}

export const api = {
  get: (path: string) => request(path),
  post: (path: string, body: unknown) =>
    request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path: string, body: unknown) =>
    request(path, { method: 'PUT', body: JSON.stringify(body) }),
}
