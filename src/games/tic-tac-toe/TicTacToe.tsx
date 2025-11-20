import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy, Users, Bot } from "lucide-react";
import { useTicTacToe } from "./useTicTacToe";
import type { GameMode } from "./types";

export const TicTacToe = () => {
  const [gameMode, setGameMode] = useState<GameMode>("pvp");
  const {
    board,
    currentPlayer,
    winner,
    gameStatus,
    winningLine,
    scores,
    makeMove,
    resetGame,
    resetAll,
  } = useTicTacToe(gameMode);

  const cellVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    tap: { scale: 0.9 },
  };

  const isWinningCell = (index: number) => {
    return winningLine?.positions.includes(index);
  };

  return (
    <div className="w-full">
      {/* Layout responsivo: columna en móvil, dos columnas en escritorio */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Panel lateral: Controles y configuración */}
        <div className="space-y-6">
          {/* Selector de modo */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Modo de Juego</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setGameMode("pvp");
                  resetAll();
                }}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all ${
                  gameMode === "pvp"
                    ? "bg-accent-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
                }`}
              >
                <Users size={22} />
                <span>Jugador vs Jugador</span>
              </button>
              <button
                onClick={() => {
                  setGameMode("cpu");
                  resetAll();
                }}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all ${
                  gameMode === "cpu"
                    ? "bg-accent-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
                }`}
              >
                <Bot size={22} />
                <span>Jugador vs CPU</span>
              </button>
            </div>
          </div>

          {/* Marcador */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Marcador</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Jugador X</span>
                  <span className="text-3xl font-bold text-blue-600">{scores.X}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Empates</span>
                  <span className="text-3xl font-bold text-gray-600">{scores.draws}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-red-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    {gameMode === "cpu" ? "CPU (O)" : "Jugador O"}
                  </span>
                  <span className="text-3xl font-bold text-red-600">{scores.O}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="space-y-3">
            <button
              onClick={resetGame}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <RotateCcw size={20} />
              Nuevo Juego
            </button>
            <button
              onClick={resetAll}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Reiniciar Todo
            </button>
          </div>
        </div>

        {/* Área del tablero */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            {/* Estado del juego */}
            <AnimatePresence mode="wait">
              {gameStatus === "playing" ? (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-center py-4 bg-accent-500/10 rounded-xl shadow-md mb-6"
                >
                  <p className="text-sm font-semibold text-gray-600 mb-1">Turno actual</p>
                  <p className="text-4xl font-bold text-accent-500">{currentPlayer}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="finished"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`text-center py-5 rounded-xl flex items-center justify-center gap-2 shadow-md mb-6 ${
                    gameStatus === "won"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {gameStatus === "won" && <Trophy size={32} />}
                  <p className="text-xl font-bold">
                    {gameStatus === "won" ? `¡Ganó ${winner}!` : "¡Empate!"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tablero */}
            <div className="bg-white border-2 border-accent-500 p-8 rounded-2xl">
              <div className="grid grid-cols-3 gap-4">
                {board.map((cell, index) => (
                  <motion.button
                    key={index}
                    variants={cellVariants}
                    initial="hidden"
                    animate="visible"
                    whileTap={cell === null && gameStatus === "playing" ? "tap" : undefined}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => makeMove(index)}
                    disabled={cell !== null || gameStatus !== "playing"}
                    className={`aspect-square rounded-2xl text-6xl font-bold transition-all ${
                      cell === null && gameStatus === "playing"
                        ? "bg-gray-50 hover:bg-gray-100 cursor-pointer hover:shadow-lg"
                        : "bg-gray-100 cursor-not-allowed"
                    } ${isWinningCell(index) ? "bg-green-200 ring-4 ring-green-400" : ""} ${
                      cell === "X" ? "text-blue-600" : "text-red-600"
                    }`}
                  >
                    <AnimatePresence>
                      {cell && (
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {cell}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
