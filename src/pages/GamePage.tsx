import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useGameStore } from "@/store/gameStore";
import type { GameId } from "@/types";
import { TicTacToe } from "@/games/tic-tac-toe";
import { Snake } from "@/games/snake";
import { Pairs } from "@/games/pairs";

export const GamePage = () => {
  const { gameId } = useParams<{ gameId: GameId }>();
  const navigate = useNavigate();
  const setCurrentGame = useGameStore((state) => state.setCurrentGame);

  useEffect(() => {
    if (gameId) {
      setCurrentGame(gameId as GameId);
    }
    return () => setCurrentGame(null);
  }, [gameId, setCurrentGame]);

  const handleBack = () => {
    navigate("/");
  };

  const renderGame = () => {
    switch (gameId) {
      case "tic-tac-toe":
        return <TicTacToe />;
      case "snake":
        return <Snake />;
      case "pairs":
        return <Pairs />;
      default:
        return (
          <div className="flex items-center justify-center h-96 bg-gray-50 rounded-xl border-4 border-dashed border-gray-300">
            <p className="text-2xl text-gray-400">Juego no encontrado</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl p-8 shadow-lg"
      >
        {/* Header del juego */}
        <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-100 mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-semibold text-gray-700"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex-grow">
            {gameId === "tic-tac-toe" && "❌⭕ Tres en Raya"}
            {gameId === "snake" && "🐍 Snake (Gusanito)"}
            {gameId === "pairs" && "🃏 Pairs"}
          </h1>
        </div>

        {/* Área del juego */}
        {renderGame()}
      </motion.div>
    </Layout>
  );
};
