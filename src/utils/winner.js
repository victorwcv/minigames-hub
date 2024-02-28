/*  Función que verifica si hay un ganador en el estado actual del juego de Tic-Tac-Toe.
 Toma como argumento el estado del juego representado como un arreglo de 9 elementos,
 donde cada elemento puede ser 'X', 'O' o null (representando un cuadrado vacío).
 Devuelve un arreglo que contiene el jugador ganador ('X' o 'O') y el código de la combinación ganadora,
 o devuelve null si no hay ganador.  */


function checkWinner(state) {
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (state[a] === state[b] && state[b] === state[c] && state[a] !== null) {
      let winCode = win[i].join("");
      let player = state[a];
      return [player, winCode];
    }
  }
  return null;
}

export default checkWinner