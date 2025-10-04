import { motion } from 'framer-motion';
import { Sparkles, Clock } from 'lucide-react';

interface ComingSoonCardProps {
  index: number;
}

export const ComingSoonCard = ({ index }: ComingSoonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg border-2 border-dashed border-gray-300 relative"
    >
      {/* Badge de "Próximamente" */}
      <div className="absolute top-4 right-4 z-10">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
        >
          <Clock size={12} />
          SOON
        </motion.div>
      </div>

      {/* Área de imagen con ícono animado */}
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center  relative overflow-hidden">
        {/* Efecto de brillo animado */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ width: '50%' }}
        />
        
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
          className="text-6xl opacity-50"
        >
          🎮
        </motion.div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 mb-3"
        >
          <Sparkles className="text-primary" size={24} />
          <h2 className="text-2xl font-bold text-gray-700">
            Más Juegos Próximamente
          </h2>
        </motion.div>
        
        <p className="text-gray-600 leading-relaxed mb-5">
          ¡Estamos trabajando en nuevos juegos emocionantes! Tetris, Buscaminas, 2048 y más están en camino.
        </p>

        {/* Lista de juegos próximos */}
        <div className="space-y-2 mb-5">
          {['🧩 Tetris', '💣 Buscaminas', '🔢 2048', '🎯 Y más...'].map((game, i) => (
            <motion.div
              key={game}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="text-sm text-gray-500 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              {game}
            </motion.div>
          ))}
        </div>

        {/* Botón deshabilitado con estilo */}
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 font-semibold py-3 rounded-lg cursor-not-allowed opacity-60"
        >
          Próximamente...
        </button>
      </div>

      {/* Decoración de esquina */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="120" cy="120" r="80" fill="currentColor" className="text-gray-400" />
        </svg>
      </div>
    </motion.div>
  );
};