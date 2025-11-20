import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 no-select"
    >
      <h1 className="text-5xl font-bold text-gray-800 mb-3 ">
        🎮 MiniGames <span className="text-accent-500">Hub</span>
      </h1>
      <p className="text-xl text-gray-600">
        Tu colección personal de juegos clásicos
      </p>
    </motion.header>
  );
};