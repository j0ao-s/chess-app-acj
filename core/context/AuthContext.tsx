import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../lib/api'

type User = { id: string; name: string; username: string; email: string }

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (name: string, username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      try {
        const token = await AsyncStorage.getItem('token')
        const stored = await AsyncStorage.getItem('user')
        if (token && stored) setUser(JSON.parse(stored))
      } catch {
        // sessão inválida, continua sem usuário
      } finally {
        setLoading(false)
      }
    }
    loadSession()
  }, [])

  async function login(username: string, password: string) {
    const data = await api.post('/auth/login', { username, password })
    await AsyncStorage.setItem('token', data.token)
    await AsyncStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
  }

  async function register(name: string, username: string, email: string, password: string) {
    const data = await api.post('/auth/register', { name, username, email, password })
    await AsyncStorage.setItem('token', data.token)
    await AsyncStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
  }

  async function logout() {
    await AsyncStorage.multiRemove(['token', 'user'])
    setUser(null)
  }

  function updateUser(data: Partial<User>) {
    if (!user) return
    const updated = { ...user, ...data }
    setUser(updated)
    AsyncStorage.setItem('user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
