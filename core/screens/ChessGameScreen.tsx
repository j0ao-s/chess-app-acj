import React, { useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { ChessBoard } from '../components/ChessBoard'
import { useChessGame } from '../hooks/useChessGame'
import theme from '../theme'
import { BottomNavigationBar } from '../components/BottomNavigationBar'

export function ChessGameScreen() {
  const router = useRouter()
  const { state, initGame, selectSquare, playMove, undoMove, resign } = useChessGame()

  useEffect(() => {
    initGame()
  }, [initGame])

  const handleSquarePress = async (square: string) => {
    if (state.isThinking || state.gameStatus !== 'in_progress') return

    if (state.selectedSquare) {
      const validMoves = state.validMoves
      if (validMoves.includes(square)) {
        await playMove(state.selectedSquare, square)
        return
      }
    }

    selectSquare(square)
  }

  const handleUndo = () => {
    console.log('handleUndo called', { moves: state.moves.length })
    if (state.moves.length < 2) {
      if (Platform.OS === 'web') {
        window.alert('Nenhuma jogada para voltar')
      } else {
        Alert.alert('Voltar', 'Nenhuma jogada para voltar')
      }
      return
    }
    undoMove()
  }

  const handleResign = () => {
    console.log('handleResign called')
    if (Platform.OS === 'web') {
      if (window.confirm('Tem certeza que quer desistir?')) {
        console.log('resign confirmed')
        resign()
        window.alert('Você desistiu. Perdeu.')
      }
    } else {
      Alert.alert('Desistir', 'Tem certeza que quer desistir?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Desistir',
          onPress: () => {
            console.log('resign confirmed')
            resign()
            Alert.alert('Jogo Encerrado', 'Você desistiu. Perdeu.')
          },
          style: 'destructive',
        },
      ])
    }
  }

  const handleNewGame = () => {
    console.log('handleNewGame called')
    if (Platform.OS === 'web') {
      if (window.confirm('Iniciar um novo jogo?')) {
        console.log('initGame confirmed')
        initGame()
      }
    } else {
      Alert.alert('Novo Jogo', 'Iniciar um novo jogo?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Novo Jogo',
          onPress: () => {
            console.log('initGame confirmed')
            initGame()
          },
        },
      ])
    }
  }

  const handleBack = () => {
    if (state.gameStatus !== 'in_progress' || state.moves.length === 0) {
      router.push('/dashboard')
      return
    }
    if (Platform.OS === 'web') {
      if (window.confirm('Deixar jogo em progresso?')) {
        router.push('/dashboard')
      }
    } else {
      Alert.alert('Voltar', 'Deixar jogo em progresso?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => router.push('/dashboard'), style: 'destructive' },
      ])
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.onSurface} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>XADREZ</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
      >
        <ChessBoard
          fen={state.fen}
          selectedSquare={state.selectedSquare}
          validMoves={state.validMoves}
          lastMove={state.lastMove}
          onSquarePress={handleSquarePress}
        />

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>{state.message}</Text>
          {state.isThinking && (
            <ActivityIndicator
              size="small"
              color={theme.colors.onSurface}
              style={{ marginTop: theme.spacing.sm }}
            />
          )}
        </View>

        <View style={styles.moveList}>
          <Text style={styles.moveListLabel}>Jogadas:</Text>
          <Text style={styles.moveListContent}>
            {state.moves.map((m, i) => `${i + 1}. ${m.from}${m.to}`).join(' ')}
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.button,
              state.moves.length < 2 && styles.buttonDisabled,
            ]}
            onPress={handleUndo}
            disabled={state.moves.length < 2}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNewGame}
          >
            <Text style={styles.buttonText}>Novo Jogo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonDanger,
              state.gameStatus !== 'in_progress' && styles.buttonDisabled,
            ]}
            onPress={handleResign}
            disabled={state.gameStatus !== 'in_progress'}
          >
            <Text style={styles.buttonText}>Desistir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigationBar activeRoute="/chess" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  appBar: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.onSurface,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.headlineMd.fontSize,
    fontWeight: theme.typography.headlineMd.fontWeight as any,
    color: theme.colors.onSurface,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
    paddingBottom: 150,
    gap: theme.spacing.lg,
  },
  statusBox: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: theme.rounded.default,
    alignItems: 'center',
  },
  statusText: {
    fontSize: theme.typography.bodyMd.fontSize,
    fontWeight: theme.typography.bodyMd.fontWeight as any,
    color: theme.colors.onSurface,
  },
  moveList: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: theme.rounded.default,
  },
  moveListLabel: {
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.sm,
  },
  moveListContent: {
    fontSize: theme.typography.bodyMd.fontSize,
    color: theme.colors.secondary,
    fontFamily: 'monospace',
  },
  buttonGroup: {
    width: '100%',
    gap: theme.spacing.md,
  },
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    borderRadius: theme.rounded.default,
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainerLowest,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonDanger: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.surface,
  },
  buttonText: {
    fontSize: theme.typography.bodyMd.fontSize,
    fontWeight: theme.typography.bodyMd.fontWeight as any,
    color: theme.colors.onSurface,
  },
})

export default ChessGameScreen
