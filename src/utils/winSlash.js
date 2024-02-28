/*  Función que devuelve estilos de posición específicos para colocar una barra diagonal en un juego de tres en raya (Tic-Tac-Toe),
 según la posición dada.
 Argumentos:
 - position: Posición de la barra diagonal en el tablero de juego, representada como una cadena de tres dígitos,
   donde cada dígito representa el índice de un cuadrado en el tablero (de 0 a 8).
 Devuelve un objeto que contiene estilos de posición para la barra diagonal, como transformaciones, coordenadas top y left, y z-index.
 Si la posición dada no tiene estilos asociados, devuelve un objeto vacío.   */

const slashPos = (position) => {
  const positions = {
    "012": {
      transform: "rotate(90deg)",
      top: "-112px",
      left: "222px",
      zIndex: "2",
    },
    345: {
      transform: "rotate(90deg)",
      top: "25px",
      left: "222px",
      zIndex: "2",
    },
    678: {
      transform: "rotate(90deg)",
      top: "170px",
      left: "222px",
      zIndex: "2",
    },
    "036": { top: "30px", left: "80px", zIndex: "2" },
    147: { top: "30px", left: "222px", zIndex: "2" },
    258: { top: "30px", left: "364px", zIndex: "2" },
    246: {
      transform: "rotate(45deg) scaleY(1.3)",
      top: "30px",
      left: "222px",
      zIndex: "2",
    },
    "048": {
      transform: "rotate(-45deg) scaleY(1.3)",
      top: "30px",
      left: "222px",
      zIndex: "2",
    },
  };

  return positions[position] || {};
};

export default slashPos;
