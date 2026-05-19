import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'

function RouteGuard() {
  const { user, loading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    const isProtected = ['dashboard', 'ranking', 'settings', 'chess'].includes(segments[0] as string)
    if (!user && isProtected) {
      router.replace('/')
    } else if (user && !isProtected) {
      router.replace('/dashboard')
    }
  }, [user, loading, segments])

  return null
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="ranking" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="chess" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  )
}
