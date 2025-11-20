import type { Game } from "@/types";

export const GAMES: Game[] = [
  {
    id: "tic-tac-toe",
    title: "Tres en Raya",
    description:
      "El clásico juego de estrategia. Juega contra la computadora o con un amigo. ¿Puedes conseguir tres en línea?",
    icon: "❌⭕",
    players: "1-2 jugadores",
    duration: "2-5 min",
    route: "/game/tic-tac-toe",
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    id: "snake",
    title: "Snake (Gusanito)",
    description:
      "Guía a la serpiente para comer y crecer sin chocar. Un juego retro adictivo que nunca pasa de moda.",
    icon: "🐍",
    players: "1 jugador",
    duration: "5-10 min",
    route: "/game/snake",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "pairs",
    title: "Pairs",
    description:
      "Encuentra todos los pares de cartas antes de que se acabe el tiempo. Cada par encontrado te da tiempo extra.",
    icon: "🃏",
    players: "1 jugador",
    duration: "3-10 min",
    route: "/game/pairs",
    gradient: "from-green-500 to-green-600",
  },
];
