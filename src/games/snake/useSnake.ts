import { useState, useEffect, useCallback, useRef } from "react";
import type { Position, Direction, GameStatus, GridSize } from "./types";

const GRID_SIZE: GridSize = { width: 20, height: 20 };
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 3;

const getInitialSnake = (): Position[] => [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const generateFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE.width),
      y: Math.floor(Math.random() * GRID_SIZE.height),
    };
  } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

export const useSnake = () => {
  const [snake, setSnake] = useState<Position[]>(getInitialSnake());
  const [food, setFood] = useState<Position>(generateFood(getInitialSnake()));
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("snake-highscore");
    return saved ? parseInt(saved) : 0;
  });
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const gameLoopRef = useRef<number | null>(null);

  // Cambiar dirección (no permitir reversa)
  const changeDirection = useCallback(
    (newDirection: Direction) => {
      setNextDirection((prev) => {
        if (
          (newDirection === "UP" && direction !== "DOWN") ||
          (newDirection === "DOWN" && direction !== "UP") ||
          (newDirection === "LEFT" && direction !== "RIGHT") ||
          (newDirection === "RIGHT" && direction !== "LEFT")
        ) {
          return newDirection;
        }
        return prev;
      });
    },
    [direction]
  );

  // Detectar colisiones
  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // Colisión con paredes
    if (head.x < 0 || head.x >= GRID_SIZE.width || head.y < 0 || head.y >= GRID_SIZE.height) {
      return true;
    }

    // Colisión con el cuerpo
    return snakeBody.some((segment) => segment.x === head.x && segment.y === head.y);
  }, []);

  // Mover serpiente
  const moveSnake = useCallback(() => {
    if (gameStatus !== "playing") return;

    setSnake((currentSnake) => {
      const head = currentSnake[0];
      let newHead: Position;

      // Actualizar dirección
      setDirection(nextDirection);

      // Calcular nueva posición de la cabeza
      switch (nextDirection) {
        case "UP":
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case "DOWN":
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case "LEFT":
          newHead = { x: head.x - 1, y: head.y };
          break;
        case "RIGHT":
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Verificar colisión
      if (checkCollision(newHead, currentSnake)) {
        setGameStatus("gameOver");
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Verificar si comió
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("snake-highscore", newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
        // Aumentar velocidad gradualmente
        setSpeed((prev) => Math.max(50, prev - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameStatus, nextDirection, food, checkCollision, highScore]);

  const startGame = useCallback(() => {
    setSnake(getInitialSnake());
    setFood(generateFood(getInitialSnake()));
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameStatus("playing");
  }, []);

  const togglePause = useCallback(() => {
    setGameStatus((prev) => (prev === "playing" ? "paused" : "playing"));
  }, []);

  const resetGame = useCallback(() => {
    setSnake(getInitialSnake());
    setFood(generateFood(getInitialSnake()));
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameStatus("idle");
  }, []);

  // Game loop
  useEffect(() => {
    if (gameStatus === "playing") {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameStatus, moveSnake, speed]);

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        gameStatus === "idle" &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      ) {
        e.preventDefault();
        startGame();
        return;
      }

      if (gameStatus !== "playing") return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          changeDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          changeDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          changeDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          changeDirection("RIGHT");
          break;
        case " ":
          e.preventDefault();
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStatus, changeDirection, startGame, togglePause]);

  return {
    snake,
    food,
    score,
    highScore,
    gameStatus,
    gridSize: GRID_SIZE,
    startGame,
    resetGame,
    togglePause,
    changeDirection,
  };
};
