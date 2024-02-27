import { useEffect, useState } from "react";
import "./Board.css";
import Square from "./Square";
import checkWinner from "../utils/winner";

function Board() {
  const [player, setPlayer] = useState(0);
  const [state, setState] = useState(Array(9).fill(null));
  const [isWinner, setIsWinner] = useState(false);
  const [status, setStatus] = useState(`Player ${player}`);
  console.log("isWinner", isWinner);
  console.log("setstate", state);
  

  useEffect(() => {
    const winner = checkWinner(state);

    console.log("win ", winner);
    if (winner != null) {
      setIsWinner(true);
      setStatus(`Player ${winner[0]} wins`);

      if (winner[1] === "012") {
        setWinStyles({
          transform: "rotate(90deg)",
          display: "block",
          transformOrigin: "center center",
          top: "-112px",
          left: "222px",
        });
      } else if (winner[1] === "345") {
        setWinStyles({
          transform: "rotate(90deg)",
          display: "block",
          transformOrigin: "center center",
          top: "25px",
          left: "222px",
        });
      } else if (winner[1] === "678") {
        setWinStyles({
          transform: "rotate(90deg)",
          display: "block",
          transformOrigin: "center center",
          top: "170px",
          left: "222px",
        });
      } else if (winner[1] === "036") {
        setWinStyles({
          display: "block",
          transformOrigin: "center center",
          top: "30px",
          left: "80px",
        });
      } else if (winner[1] === "147") {
        setWinStyles({
          display: "block",
          transformOrigin: "center center",
          top: "30px",
          left: "222px",
        });
      } else if (winner[1] === "258") {
        setWinStyles({
          display: "block",
          transformOrigin: "center center",
          top: "30px",
          left: "364px",
        });
      } else if (winner[1] === "246") {
        setWinStyles({
          transform: "rotate(45deg) scaleY(1.3)",
          display: "block",
          transformOrigin: "center center",
          top: "30px",
          left: "222px",
        });
      } else if (winner[1] === "048") {
        setWinStyles({
          transform: "rotate(-45deg) scaleY(1.3)",
          display: "block",
          transformOrigin: "center center",
          top: "30px",
          left: "222px",
        });
      } else {
        setWinStyles(null);
      }
      console.log(status);
    }
  }, [player, state, status, isWinner]);

  const [winStyles, setWinStyles] = useState(null);

  // console.log(`agregando estado ${JSON.stringify(state)}`);

  const newState = (idOfSquare) => {
    let thePlayer = player;
    state[idOfSquare] = player;
    setState(state);
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    setStatus(`Player ${nextplayer}`);
    return thePlayer;
  };

  function renderSquare(i) {
    return <Square id={i} newState={newState} />;
  }

  return (
    <div className="container">
      <div className="game-board">
        <div className="slash" style={winStyles}></div>
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <h2 className="player">{status}</h2>
    </div>
  );
}

export default Board;
