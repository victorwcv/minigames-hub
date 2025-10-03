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
    gradient: "from-primary to-primary-dark",
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
    gradient: "from-primary-light to-primary",
  },
  {
    id: "simon",
    title: "Simon Dice",
    description:
      "Pon a prueba tu memoria siguiendo la secuencia de colores. ¿Hasta qué nivel puedes llegar?",
    icon: "🎨",
    players: "1 jugador",
    duration: "3-8 min",
    route: "/game/simon",
    gradient: "from-primary to-primary-light",
  },
];
