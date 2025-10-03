import { useState, useCallback, useEffect } from 'react';
import type { Board, Player, GameMode, GameStatus, WinningLine } from './types';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
  [0, 4, 8], [2, 4, 6]             // Diagonales
];

export const useTicTacToe = (mode: GameMode = 'pvp') => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Verificar ganador
  const checkWinner = useCallback((boardToCheck: Board): WinningLine | null => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return {
          positions: combo,
          player: boardToCheck[a]
        };
      }
    }
    return null;
  }, []);

  // Verificar empate
  const checkDraw = useCallback((boardToCheck: Board): boolean => {
    return boardToCheck.every(cell => cell !== null) && !checkWinner(boardToCheck);
  }, [checkWinner]);

  // IA simple - busca ganar o bloquear
  const getCpuMove = useCallback((currentBoard: Board): number => {
    // 1. Intenta ganar
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = 'O';
        if (checkWinner(testBoard)?.player === 'O') {
          return i;
        }
      }
    }

    // 2. Bloquea al jugador
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = 'X';
        if (checkWinner(testBoard)?.player === 'X') {
          return i;
        }
      }
    }

    // 3. Toma el centro si está disponible
    if (currentBoard[4] === null) return 4;

    // 4. Toma una esquina
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => currentBoard[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // 5. Toma cualquier espacio disponible
    const available = currentBoard
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null) as number[];
    
    return available[Math.floor(Math.random() * available.length)];
  }, [checkWinner]);

  // Hacer movimiento
  const makeMove = useCallback((index: number) => {
    if (board[index] || winner || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.player);
      setWinningLine(winResult);
      setGameStatus('won');
      setScores(prev => ({
        ...prev,
        [winResult.player!]: prev[winResult.player!] + 1
      }));
      return;
    }

    if (checkDraw(newBoard)) {
      setGameStatus('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, winner, gameStatus, checkWinner, checkDraw]);

  // Turno de la CPU
  useEffect(() => {
    if (mode === 'cpu' && currentPlayer === 'O' && gameStatus === 'playing' && !winner) {
      const timer = setTimeout(() => {
        const cpuMove = getCpuMove(board);
        makeMove(cpuMove);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, mode, gameStatus, winner, board, getCpuMove, makeMove]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameStatus('playing');
    setWinningLine(null);
  }, []);

  // Reiniciar todo (incluyendo puntajes)
  const resetAll = useCallback(() => {
    resetGame();
    setScores({ X: 0, O: 0, draws: 0 });
  }, [resetGame]);

  return {
    board,
    currentPlayer,
    winner,
    gameStatus,
    winningLine,
    scores,
    makeMove,
    resetGame,
    resetAll,
  };
};