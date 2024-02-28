import { useEffect, useState } from "react";

 /* 
 Componente Square: representa un cuadrado en el tablero del juego Tic-Tac-Toe.
 Props:
 - id: Identificador único del cuadrado.
 - newState: Función para actualizar el estado del juego después de que un jugador realiza un movimiento.
 - won: Booleano que indica si el juego ha sido ganado.
 - play: Booleano que indica si el juego está en curso y es el turno de un jugador. 
 */

function Square({ id, newState, won, play }) {
  const [status, setStatus] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const xo = ["O", "X"];

  useEffect(() => {
    setDisabled(won);
    if (play) setStatus(null);
  }, [won, play]);

  const hadleClicOne = () => {
    if (status === null) {
      let nextplayer = newState(id);
      setStatus(nextplayer);
    }
  };

  return (
    <button disabled={disabled} onClick={hadleClicOne}>
      {xo[status]}
    </button>
  );
}

export default Square;
