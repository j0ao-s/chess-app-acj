import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'
import { api } from '../lib/api'

type GameStatus = 'in_progress' | 'checkmate' | 'stalemate' | 'draw' | 'resigned'

export interface ChessGameState {
  fen: string
  moves: Array<{ from: string; to: string }>
  selectedSquare: string | null
  validMoves: string[]
  lastMove: { from: string; to: string } | null
  isThinking: boolean
  gameStatus: GameStatus
  message: string
}

export function useChessGame() {
  const [game] = useState(() => new Chess())
  const [state, setState] = useState<ChessGameState>({
    fen: game.fen(),
    moves: [],
    selectedSquare: null,
    validMoves: [],
    lastMove: null,
    isThinking: false,
    gameStatus: 'in_progress',
    message: 'Sua vez (branco)',
  })

  const getValidMovesForSquare = useCallback((square: string) => {
    try {
      const moves = game.moves({ square: square as any, verbose: true })
      return moves.map((m: any) => m.to)
    } catch {
      return []
    }
  }, [game])

  const initGame = useCallback(() => {
    console.log('initGame executing - resetting game')
    game.reset()
    const newFen = game.fen()
    console.log('After reset, newFen:', newFen)
    setState({
      fen: newFen,
      moves: [],
      selectedSquare: null,
      validMoves: [],
      lastMove: null,
      isThinking: false,
      gameStatus: 'in_progress',
      message: 'Sua vez (branco)',
    })
  }, [game])

  const selectSquare = useCallback((square: string) => {
    setState(prev => {
      if (prev.selectedSquare === square) {
        return { ...prev, selectedSquare: null, validMoves: [] }
      }

      if (prev.selectedSquare) {
        const validMoves = getValidMovesForSquare(prev.selectedSquare)
        if (validMoves.includes(square)) {
          return {
            ...prev,
            selectedSquare: null,
            validMoves: [],
          }
        }
      }

      const validMoves = getValidMovesForSquare(square)
      return {
        ...prev,
        selectedSquare: square,
        validMoves,
      }
    })
  }, [getValidMovesForSquare])

  const playMove = useCallback(
    async (from: string, to: string) => {
      try {
        const beforeFen = game.fen()
        const moveResult = game.move({ from, to })
        if (!moveResult) return false

        const newFen = game.fen()

        let newStatus: GameStatus = 'in_progress'
        let message = "Bot pensando..."

        if (game.isCheckmate()) {
          newStatus = 'checkmate'
          message = 'Você venceu por xeque-mate!'
        } else if (game.isStalemate()) {
          newStatus = 'stalemate'
          message = 'Jogo encerrado: Empate (afogamento)'
        } else if (game.isDraw()) {
          newStatus = 'draw'
          message = 'Jogo encerrado: Empate'
        }

        setState(prev => ({
          ...prev,
          fen: newFen,
          moves: [...prev.moves, { from, to }],
          lastMove: { from, to },
          selectedSquare: null,
          validMoves: [],
          isThinking: newStatus === 'in_progress',
          gameStatus: newStatus,
          message,
        }))

        if (newStatus !== 'in_progress') {
          setState(prev => ({ ...prev, isThinking: false }))
          registerGameResult(newStatus)
          return true
        }

        const moveUCI = `${from}${to}`
        await requestBotMove(beforeFen, moveUCI)
        return true
      } catch (err) {
        console.error('Move error:', err)
        return false
      }
    },
    [game]
  )

  const requestBotMove = useCallback(async (fen: string, lastMove: string = '') => {
    setState(prev => ({ ...prev, isThinking: true }))
    try {
      const response = await api.post('/chess/move', { fen, moveUCI: lastMove })
      const { botMove, newFen, gameStatus: backendStatus } = response

      game.load(newFen)

      let newStatus: GameStatus = 'in_progress'
      let message = 'Sua vez (branco)'

      if (backendStatus === 'checkmate') {
        newStatus = 'checkmate'
        message = 'Xeque-mate! Você perdeu.'
      } else if (backendStatus === 'stalemate') {
        newStatus = 'stalemate'
        message = 'Empate por afogamento!'
      } else if (backendStatus === 'draw') {
        newStatus = 'draw'
        message = 'Empate!'
      } else if (game.isCheck()) {
        message = 'Você está em xeque!'
      }

      setState(prev => ({
        ...prev,
        fen: newFen,
        moves: [...prev.moves, { from: botMove.from, to: botMove.to }],
        lastMove: { from: botMove.from, to: botMove.to },
        selectedSquare: null,
        validMoves: [],
        isThinking: false,
        gameStatus: newStatus,
        message,
      }))

      if (newStatus !== 'in_progress') {
        registerGameResult(newStatus)
      }
    } catch (err) {
      console.error('Bot move error:', err)
      setState(prev => ({
        ...prev,
        isThinking: false,
        message: 'Erro ao calcular movimento do bot',
      }))
    }
  }, [game])

  const undoMove = useCallback(() => {
    game.reset()
    setState(prev => {
      if (prev.moves.length < 2) return prev

      const newMoves = prev.moves.slice(0, -2)

      for (const move of newMoves) {
        game.move({ from: move.from, to: move.to })
      }

      const newFen = game.fen()
      return {
        ...prev,
        fen: newFen,
        moves: newMoves,
        selectedSquare: null,
        validMoves: [],
        lastMove: newMoves.length > 0 ? newMoves[newMoves.length - 1] : null,
        isThinking: false,
        gameStatus: 'in_progress',
        message: 'Sua vez (branco)',
      }
    })
  }, [game])

  const resign = useCallback(() => {
    setState(prev => ({
      ...prev,
      gameStatus: 'resigned',
      message: 'Você desistiu. Perdeu.',
    }))
    registerGameResult('resigned')
  }, [])

  const registerGameResult = useCallback(async (status: GameStatus) => {
    try {
      await api.post('/chess/finish', { gameStatus: status })
    } catch (err) {
      console.error('Error registering game result:', err)
    }
  }, [])

  return {
    state,
    initGame,
    selectSquare,
    playMove,
    requestBotMove,
    undoMove,
    resign,
  }
}
