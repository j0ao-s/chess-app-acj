import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Chess } from 'chess.js'
import theme from '../theme'

interface ChessBoardProps {
  fen: string
  selectedSquare: string | null
  validMoves: string[]
  lastMove: { from: string; to: string } | null
  onSquarePress: (square: string) => void
}

const PIECE_SYMBOLS: Record<string, string> = {
  p: '♟︎', P: '♙︎',
  n: '♞︎', N: '♘︎',
  b: '♝︎', B: '♗︎',
  r: '♜︎', R: '♖︎',
  q: '♛︎', Q: '♕︎',
  k: '♚︎', K: '♔︎',
}

const SQUARE_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export function ChessBoard({
  fen,
  selectedSquare,
  validMoves,
  lastMove,
  onSquarePress,
}: ChessBoardProps) {
  const game = new Chess(fen)
  const board = game.board()

  const renderSquare = (row: number, col: number) => {
    const fileChar = SQUARE_NAMES[col]
    const rankNum = 8 - row
    const square = `${fileChar}${rankNum}`

    const piece = board[row]?.[col]
    const isLight = (row + col) % 2 === 0
    const isSelected = selectedSquare === square
    const isValid = validMoves.includes(square)
    const isLastMoveFrom = lastMove?.from === square
    const isLastMoveTo = lastMove?.to === square

    let bgColor = isLight ? '#f0f0f0' : '#6b6b6b'

    if (isSelected) {
      bgColor = '#e3b447'
    } else if (isLastMoveFrom || isLastMoveTo) {
      bgColor = isLight ? '#e8e8a0' : '#6b6b00'
    }

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          {
            backgroundColor: bgColor,
            width: '12.5%',
            height: '12.5%',
          },
        ]}
        onPress={() => onSquarePress(square)}
      >
        {piece && (
          <Text
            style={[
              styles.piece,
              {
                color: piece.color === 'w' ? '#000000' : '#ffffff',
              },
            ]}
          >
            {PIECE_SYMBOLS[piece.color === 'w' ? piece.type.toUpperCase() : piece.type]}
          </Text>
        )}
        {isValid && (
          <View
            style={[
              styles.validMoveIndicator,
              { backgroundColor: 'rgba(227, 180, 71, 0.6)' },
            ]}
          />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => renderSquare(row, col))
        )}
      </View>
      <View style={styles.coordinates}>
        <View style={styles.filesRow}>
          {SQUARE_NAMES.map(file => (
            <Text key={file} style={styles.coordinate}>
              {file}
            </Text>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  board: {
    width: 320,
    height: 320,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: theme.colors.onSurface,
    backgroundColor: '#6b6b6b',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  piece: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  validMoveIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
  },
  coordinates: {
    width: 320,
    paddingHorizontal: theme.spacing.md,
  },
  filesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coordinate: {
    fontSize: 12,
    fontWeight: '700' as any,
    color: theme.colors.onSurface,
    width: 40,
    textAlign: 'center',
  },
})
