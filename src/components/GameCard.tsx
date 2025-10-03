import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import type { Game } from "@/types";

interface GameCardProps {
  game: Game;
  index: number;
}

export const GameCard = ({ game, index }: GameCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex-1 flex flex-col"
      >
        {/* Imagen del juego */}
        <div
          className={`h-48 bg-gradient-to-br ${game.gradient} flex items-center justify-center text-6xl`}
        >
          <span>{game.icon}</span>
        </div>

        {/* Contenido */}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{game.title}</h2>
          <p className="flex-1 text-gray-600 leading-relaxed mb-5">{game.description}</p>

          {/* Estadísticas */}
          <div className="flex gap-4 mb-5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{game.players}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{game.duration}</span>
            </div>
          </div>

          {/* Botón de jugar */}
          <button
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all duration-300 active:scale-95  cursor-pointer"
            onClick={() => navigate(game.route)}
          >
            Jugar Ahora
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
