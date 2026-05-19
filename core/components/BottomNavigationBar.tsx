import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { LayoutDashboard, Swords, Trophy, User } from 'lucide-react-native'
import theme from '../theme'
import Animated, { SlideInDown } from 'react-native-reanimated'

interface BottomNavigationBarProps {
  activeRoute: '/dashboard' | '/chess' | '/ranking' | '/settings'
}

export function BottomNavigationBar({ activeRoute }: BottomNavigationBarProps) {
  const router = useRouter()

  const tabs = [
    { route: '/dashboard', label: 'DASHBOARD', Icon: LayoutDashboard },
    { route: '/chess', label: 'JOGO', Icon: Swords },
    { route: '/ranking', label: 'CLASSIFICAÇÃO', Icon: Trophy },
    { route: '/settings', label: 'PERFIL', Icon: User },
  ]

  return (
    <Animated.View 
      style={styles.bottomNav} 
      pointerEvents="auto" 
      entering={SlideInDown.duration(400).springify()}
    >
      {tabs.map((tab) => {
        const isActive = activeRoute === tab.route
        const color = isActive ? theme.colors.onSurface : '#a1a1aa'

        return (
          <TouchableOpacity
            key={tab.route}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => {
              if (!isActive) router.push(tab.route as any)
            }}
          >
            <tab.Icon size={20} color={color} strokeWidth={1.5} />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: theme.colors.surfaceContainerLowest,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.onSurface,
    paddingHorizontal: theme.spacing.md,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 2,
    borderTopColor: 'transparent',
  },
  navItemActive: {
    borderTopColor: theme.colors.onSurface,
  },
  navLabel: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    marginTop: 4,
    color: '#a1a1aa',
  },
  navLabelActive: {
    color: theme.colors.onSurface,
  },
})