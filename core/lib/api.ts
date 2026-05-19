import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

// Detecta automaticamente o ambiente:
// - Expo web: localhost:3000
// - Android emulator: 10.0.2.2:3000
// - Dispositivo físico (iPhone/Android): 192.168.1.100:3000 (AJUSTE O IP)
const isWeb = Platform.OS === 'web'
const isAndroidEmulator = Platform.OS === 'android' && Constants.isDevice === false
const isPhysicalDevice = Constants.isDevice === true
const devHost = Constants.expoConfig?.hostUri?.split(':')[0]

// ⚠️ ALTERE ESTE IP PARA O SEU IP LOCAL (descubra com `ipconfig`)
const PHYSICAL_DEVICE_IP = '192.168.1.16'
const PORT = 3000

export const API_URL = __DEV__
  ? isWeb
    ? `http://localhost:${PORT}`
    : devHost
    ? `http://${devHost}:${PORT}`
    : isPhysicalDevice
    ? `http://${PHYSICAL_DEVICE_IP}:${PORT}`
    : isAndroidEmulator
    ? `http://10.0.2.2:${PORT}`
    : `http://localhost:${PORT}`
  : `http://localhost:${PORT}`

console.log('API_URL', API_URL, 'Platform', Platform.OS, 'isDevice', Constants.isDevice)

async function request(path: string, options: RequestInit = {}) {
  const token = await AsyncStorage.getItem('token')
  const url = `${API_URL}${path}`

  console.log(`[API] 📤 ${options.method || 'GET'} ${url}`)

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers as object | undefined),
      },
    })

    clearTimeout(timeoutId)
    console.log(`[API] ✅ ${res.status} - ${url}`)

    const data = await res.json()

    if (!res.ok) throw new Error(data.error || 'Erro desconhecido')

    return data
  } catch (err: any) {
    console.error(`[API] ❌ Error on ${url}:`, err.message)
    throw err
  }
}

export const api = {
  get: (path: string) => request(path),
  post: (path: string, body: unknown) =>
    request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path: string, body: unknown) =>
    request(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (path: string, body: unknown) =>
    request(path, { method: 'PATCH', body: JSON.stringify(body) }),
}
