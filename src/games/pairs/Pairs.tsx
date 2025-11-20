import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Trophy, Timer, Target, Pause, Clock } from "lucide-react";
import { usePairs } from "./usePairs";
import type { Difficulty } from "./types";

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Fácil",
  medium: "Normal",
  hard: "Difícil",
};

export const Pairs = () => {
  const {
    cards,
    difficulty,
    matchedPairs,
    totalPairs,
    moves,
    timeLeft,
    gameStatus,
    score,
    highScore,
    gridCols,
    cardsReady,
    prepareCards,
    startGame,
    flipCard,
    togglePause,
    resetGame,
  } = usePairs();

  const getTimeColor = () => {
    if (timeLeft > 30) return "text-green-600";
    if (timeLeft > 10) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Dificultad */}

          {/* Estadísticas */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Estadísticas</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className={getTimeColor()} size={18} />
                    <span className="text-sm font-semibold text-gray-700">Tiempo</span>
                  </div>
                  <span className={`text-3xl font-bold ${getTimeColor()}`}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-accent-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target size={18} className="text-accent-500" />
                    <span className="text-sm font-semibold text-gray-700">Pares</span>
                  </div>
                  <span className="text-3xl font-bold text-accent-500">
                    {matchedPairs}/{totalPairs}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Movimientos</span>
                  <span className="text-3xl font-bold text-gray-600">{moves}</span>
                </div>
              </div>

              {score > 0 && (
                <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Puntuación</span>
                    <span className="text-3xl font-bold text-purple-600">{score}</span>
                  </div>
                </div>
              )}

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
            {!cardsReady && (
              <motion.div
                key="select"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-6 bg-accent-500/10 rounded-xl shadow-md"
              >
                <p className="text-5xl mb-3">🃏</p>
                <p className="text-lg font-bold text-gray-800 mb-2">¡Encuentra los pares!</p>
                <p className="text-sm text-gray-600">Selecciona una dificultad</p>
              </motion.div>
            )}

            {cardsReady && gameStatus === "idle" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-6 bg-blue-50 rounded-xl shadow-md border-2 border-blue-300"
              >
                <p className="text-5xl mb-3">✅</p>
                <p className="text-lg font-bold text-blue-800 mb-2">¡Todo listo!</p>
                <p className="text-sm text-gray-600">Presiona Iniciar cuando estés preparado</p>
              </motion.div>
            )}

            {gameStatus === "playing" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-center py-6 bg-green-50 rounded-xl shadow-md border-2 border-green-300"
              >
                <Clock size={48} className="mx-auto mb-3 text-green-600" />
                <p className="text-lg font-bold text-green-800 mb-2">🎮 ¡Jugando!</p>
                <p className="text-sm text-gray-600">Encuentra todos los pares</p>
              </motion.div>
            )}

            {gameStatus === "paused" && (
              <motion.div
                key="paused"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-6 bg-yellow-50 rounded-xl shadow-md border-2 border-yellow-300"
              >
                <Pause size={48} className="mx-auto mb-3 text-yellow-600" />
                <p className="text-lg font-bold text-yellow-800 mb-2">⏸️ Pausado</p>
                <p className="text-sm text-gray-600">El tiempo está detenido</p>
              </motion.div>
            )}

            {gameStatus === "won" && (
              <motion.div
                key="won"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-6 bg-green-100 rounded-xl shadow-md border-2 border-green-400"
              >
                <Trophy size={48} className="mx-auto mb-3 text-green-600" />
                <p className="text-lg font-bold text-green-800 mb-2">🎉 ¡Victoria!</p>
                <p className="text-sm text-gray-600">Puntuación: {score}</p>
              </motion.div>
            )}

            {gameStatus === "gameOver" && (
              <motion.div
                key="gameOver"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-6 bg-red-50 rounded-xl shadow-md border-2 border-red-300"
              >
                <p className="text-4xl mb-3">⏰</p>
                <p className="text-lg font-bold text-red-800 mb-2">¡Tiempo agotado!</p>
                <p className="text-sm text-gray-600">
                  Encontraste {matchedPairs}/{totalPairs} pares
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controles */}
          <div className="space-y-3">
            {cardsReady && gameStatus === "idle" && (
              <button
                onClick={startGame}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Play size={20} />
                Iniciar Juego
              </button>
            )}

            {(gameStatus === "won" || gameStatus === "gameOver") && (
              <button
                onClick={resetGame}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Play size={20} />
                Jugar de Nuevo
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

            {cardsReady && (
              <button
                onClick={resetGame}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <RotateCcw size={20} />
                Cambiar Dificultad
              </button>
            )}
          </div>

          {/* Instrucciones */}
          {!cardsReady && gameStatus === "idle" && (
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
              <h3 className="text-sm font-bold text-gray-800 mb-3">📋 Cómo jugar</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Voltea 2 cartas para buscar pares</p>
                <p>• Cada par suma tiempo extra</p>
                <p>• Si se acaba el tiempo, pierdes</p>
                <p>• ¡Encuentra todos los pares!</p>
              </div>
            </div>
          )}
        </div>

        {/* Área del juego */}
        <div className="flex justify-center">
          {!cardsReady ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-6xl mb-4">🎮</p>
              <p className="text-2xl font-bold text-gray-400">Selecciona una dificultad</p>

              <div className="bg-gray-50 rounded-2xl p-6 shadow-md mt-10">
                <div className="space-y-3">
                  {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => prepareCards(diff)}
                      className="w-full px-5 py-4 rounded-xl font-semibold transition-all bg-white text-gray-700 hover:bg-accent-500 hover:text-white border-2 border-gray-200 hover:border-accent-500 hover:scale-105"
                    >
                      {DIFFICULTY_LABELS[diff]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="w-full max-w-3xl">
              <div
                className="grid gap-3 p-4"
                style={{
                  gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                }}
              >
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: card.id * 0.03 }}
                    className="aspect-square perspective-1000"
                  >
                    <motion.div
                      onClick={() => {
                        if (!card.isMatched) flipCard(card.id);
                      }}
                      className={`
                        relative w-full h-full cursor-pointer
                        ${card.isMatched ? "opacity-100 cursor-default" : ""}
                        ${
                          !card.isFlipped && !card.isMatched && gameStatus === "playing"
                            ? "hover:scale-105"
                            : ""
                        }
                      `}
                      animate={{
                        rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* back */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center bg-gradient-to-tl from-accent-500 to-accent-600 shadow-xl"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        <div className="w-1/3 h-1/3 bg-white/95 rounded-full">
                          <img src="/minigames-hub/vc-logo.png" alt="logo" />
                        </div>
                      </div>

                      {/* front */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center shadow-xl"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <span className={difficulty === "easy" ? "text-6xl" : "text-4xl"}>
                          {card.value}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
