import { useState, useCallback, useEffect, useRef } from "react";
import type { Card, Difficulty, GameStatus, DifficultyConfig } from "./types";

// Emojis para las cartas
const CARD_EMOJIS = [
  "🎮",
  "🎯",
  "🎲",
  "🎪",
  "🎨",
  "🎭",
  "🎬",
  "🎸",
  "🎹",
  "🎺",
  "🎻",
  "🎤",
  "🏀",
  "⚽",
  "🏈",
  "🎾",
  "🏐",
  "🏓",
  "🎳",
  "🎿",
  "🚀",
  "✈️",
  "🚁",
  "⛵",
];

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: { pairs: 6, initialTime: 40, timeBonus: 8, cols: 4 },
  medium: { pairs: 10, initialTime: 60, timeBonus: 6, cols: 5 },
  hard: { pairs: 15, initialTime: 80, timeBonus: 4, cols: 6 },
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateCards = (pairs: number): Card[] => {
  const selectedEmojis = shuffleArray(CARD_EMOJIS).slice(0, pairs);
  const cardPairs = [...selectedEmojis, ...selectedEmojis];
  const shuffledCards = shuffleArray(cardPairs);

  return shuffledCards.map((emoji, index) => ({
    id: index,
    value: emoji,
    isFlipped: false,
    isMatched: false,
  }));
};

export const usePairs = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_CONFIG.medium.initialTime);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [cardsReady, setCardsReady] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("pairs-highscore");
    return saved ? parseInt(saved) : 0;
  });

  const timerRef = useRef<number | null>(null);
  const canFlipRef = useRef(true);

  const config = DIFFICULTY_CONFIG[difficulty];

  // Timer
  useEffect(() => {
    if (gameStatus === "playing" && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStatus("gameOver");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [gameStatus, timeLeft]);

  // Verificar victoria
  useEffect(() => {
    if (gameStatus === "playing" && matchedPairs === config.pairs) {
      setGameStatus("won");
      const finalScore = timeLeft * 10 + config.pairs * 100 - moves * 5;
      setScore(finalScore);

      if (finalScore > highScore) {
        setHighScore(finalScore);
        localStorage.setItem("pairs-highscore", finalScore.toString());
      }
    }
  }, [matchedPairs, config.pairs, gameStatus, timeLeft, moves, highScore]);

  // Preparar cartas (cuando se selecciona dificultad)
  const prepareCards = useCallback((selectedDifficulty: Difficulty) => {
    const config = DIFFICULTY_CONFIG[selectedDifficulty];

    setDifficulty(selectedDifficulty);
    setCards(generateCards(config.pairs));
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeLeft(config.initialTime);
    setScore(0);
    setGameStatus("idle");
    setCardsReady(true);
    canFlipRef.current = false;
  }, []);

  // Iniciar juego (comienza el temporizador)
  const startGame = useCallback(() => {
    if (!cardsReady) return;

    setGameStatus("playing");
    canFlipRef.current = true;
  }, [cardsReady]);

  // Voltear carta
  const flipCard = useCallback(
    (cardId: number) => {
      if (!canFlipRef.current || gameStatus !== "playing") return;

      const card = cards[cardId];
      if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));

      const newFlipped = [...flippedCards, cardId];
      setFlippedCards(newFlipped);

      // Si se voltearon 2 cartas
      if (newFlipped.length === 2) {
        canFlipRef.current = false;
        setMoves((prev) => prev + 1);

        const [first, second] = newFlipped;
        const firstCard = cards[first];
        const secondCard = cards[second];

        if (firstCard.value === secondCard.value) {
          // ¡Par encontrado!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) => (c.id === first || c.id === second ? { ...c, isMatched: true } : c))
            );
            setMatchedPairs((prev) => prev + 1);
            setTimeLeft((prev) => prev + config.timeBonus);
            setFlippedCards([]);
            canFlipRef.current = true;
          }, 600);
        } else {
          // No coinciden
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) => (c.id === first || c.id === second ? { ...c, isFlipped: false } : c))
            );
            setFlippedCards([]);
            canFlipRef.current = true;
          }, 1000);
        }
      }
    },
    [cards, flippedCards, gameStatus, config.timeBonus]
  );

  // Pausar/Reanudar
  const togglePause = useCallback(() => {
    setGameStatus((prev) => (prev === "playing" ? "paused" : "playing"));
  }, []);

  // Resetear
  const resetGame = useCallback(() => {
    setCards([]);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeLeft(DIFFICULTY_CONFIG[difficulty].initialTime);
    setScore(0);
    setGameStatus("idle");
    setCardsReady(false);
    canFlipRef.current = true;
  }, [difficulty]);

  return {
    cards,
    difficulty,
    matchedPairs,
    totalPairs: config.pairs,
    moves,
    timeLeft,
    gameStatus,
    score,
    highScore,
    gridCols: config.cols,
    cardsReady,
    prepareCards,
    startGame,
    flipCard,
    togglePause,
    resetGame,
    setDifficulty,
  };
};
