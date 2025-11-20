import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Pause,
  Trophy,
  Gamepad2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useSnake } from "./useSnake";

export const Snake = () => {
  const {
    snake,
    food,
    score,
    highScore,
    gameStatus,
    gridSize,
    startGame,
    resetGame,
    togglePause,
    changeDirection,
  } = useSnake();

  const cellSize = 20; // Tamaño de cada celda en píxeles

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Marcador */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Puntuación</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-accent-500">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Puntos</span>
                  <span className="text-3xl font-bold text-accent-500">{score}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-yellow-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-yellow-600" />
                    <span className="text-sm font-semibold text-gray-700">Récord</span>
                  </div>
                  <span className="text-3xl font-bold text-yellow-600">{highScore}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estado del juego */}
          <AnimatePresence mode="wait">
            {gameStatus === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-40 text-center py-6 bg-accent-500/10 rounded-xl shadow-md"
              >
                <Gamepad2 size={48} className="mx-auto mb-3 text-accent-500" />
                <p className="text-lg font-bold text-gray-800 mb-2">¡Listo para jugar!</p>
                <p className="text-sm text-gray-600">Presiona Iniciar o ESPACIO</p>
              </motion.div>
            )}

            {gameStatus === "playing" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="h-40 text-center py-6 bg-green-50 rounded-xl shadow-md border-2 border-green-300"
              >
                <p className="text-lg font-bold text-green-800 mb-2">¡Jugando!</p>
                <p className="text-sm text-gray-600">Presiona ESPACIO para pausar</p>
              </motion.div>
            )}

            {gameStatus === "paused" && (
              <motion.div
                key="paused"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-40 text-center py-6 bg-yellow-50 rounded-xl shadow-md border-2 border-yellow-300"
              >
                <Pause size={48} className="mx-auto mb-3 text-yellow-600" />
                <p className="text-lg font-bold text-yellow-800 mb-2">Pausado</p>
                <p className="text-sm text-gray-600">Presiona ESPACIO para continuar</p>
              </motion.div>
            )}

            {gameStatus === "gameOver" && (
              <motion.div
                key="gameOver"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-40 text-center py-6 bg-red-50 rounded-xl shadow-md border-2 border-red-300"
              >
                <p className="text-4xl mb-3">💀</p>
                <p className="text-lg font-bold text-red-800 mb-2">¡Game Over!</p>
                <p className="text-sm text-gray-600">Puntuación final: {score}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controles */}
          <div className="space-y-3">
            {gameStatus === "idle" && (
              <button
                onClick={startGame}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Play size={20} />
                Iniciar Juego
              </button>
            )}

            {gameStatus === "playing" && (
              <button
                onClick={togglePause}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Pause size={20} />
                Pausar
              </button>
            )}

            {gameStatus === "paused" && (
              <button
                onClick={togglePause}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Play size={20} />
                Continuar
              </button>
            )}

            <button
              onClick={resetGame}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              <RotateCcw size={20} />
              Reiniciar
            </button>
          </div>
        </div>

        {/* Área del juego */}
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div
              className="relative bg-gray-900 rounded-lg overflow-hidden"
              style={{
                width: gridSize.width * cellSize,
                height: gridSize.height * cellSize,
              }}
            >
              {/* Serpiente */}
              {snake.map((segment, index) => (
                <motion.div
                  key={`snake-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute ${
                    index === 0 ? "bg-accent-500" : "bg-accent-400"
                  } rounded-sm`}
                  style={{
                    width: cellSize - 2,
                    height: cellSize - 2,
                    left: segment.x * cellSize + 1,
                    top: segment.y * cellSize + 1,
                  }}
                />
              ))}

              {/* Comida */}
              <motion.div
                key={`food-${food.x}-${food.y}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute bg-red-500 rounded-full flex items-center justify-center text-xs"
                style={{
                  width: cellSize - 2,
                  height: cellSize - 2,
                  left: food.x * cellSize + 1,
                  top: food.y * cellSize + 1,
                }}
              >
                🍎
              </motion.div>

              {/* Grid (opcional, para debug) */}
              {gameStatus === "idle" && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: gridSize.height }).map((_, y) =>
                    Array.from({ length: gridSize.width }).map((_, x) => (
                      <div
                        key={`grid-${x}-${y}`}
                        className="absolute border border-gray-800/20"
                        style={{
                          width: cellSize,
                          height: cellSize,
                          left: x * cellSize,
                          top: y * cellSize,
                        }}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Instrucciones */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md hidden lg:block w-[448px]">
            <h3 className="text-sm font-bold text-gray-800 mb-3">⌨️ Controles</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>↑ ↓ ← → o WASD: Mover</p>
              <p>ESPACIO: Pausar/Reanudar</p>
            </div>
          </div>
          {/* Controles móviles */}
          <div className="lg:hidden bg-gray-50 rounded-2xl p-6 shadow-md w-[448px]">
            <h3 className="text-sm font-bold text-gray-800 mb-3 text-center">Controles</h3>
            <div className="grid grid-cols-3 gap-2">
              <div></div>
              <button
                onClick={() => changeDirection("UP")}
                className="aspect-square bg-white active:bg-accent-400 border-2 border-gray-200 rounded-lg flex items-center justify-center transition-colors active:scale-95"
                disabled={gameStatus !== "playing"}
              >
                <ArrowUp size={24} />
              </button>
              <div></div>
              <button
                onClick={() => changeDirection("LEFT")}
                className="aspect-square bg-white active:bg-accent-400 border-2 border-gray-200 rounded-lg flex items-center justify-center transition-colors active:scale-95"
                disabled={gameStatus !== "playing"}
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={() => changeDirection("DOWN")}
                className="aspect-square bg-white active:bg-accent-400 border-2 border-gray-200 rounded-lg flex items-center justify-center transition-colors active:scale-95"
                disabled={gameStatus !== "playing"}
              >
                <ArrowDown size={24} />
              </button>
              <button
                onClick={() => changeDirection("RIGHT")}
                className="aspect-square bg-white active:bg-accent-400 border-2 border-gray-200 rounded-lg flex items-center justify-center transition-colors active:scale-95"
                disabled={gameStatus !== "playing"}
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
