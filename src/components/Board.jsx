import { useEffect, useState, useRef } from "react";
import "./Board.css";
import Square from "./Square";
import checkWinner from "../utils/winner";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "@react-spring/web";

function Board() {
  const [player, setPlayer] = useState(0);
  const [state, setState] = useState(Array(9).fill(null));
  const [isWinner, setIsWinner] = useState(false);
  const [status, setStatus] = useState("Player 0");
  const [winStyles, setWinStyles] = useState({});
  const [play, setPlay] = useState(true);
  const squareRef = useRef(null);

  const [ref, { height }] = useMeasure();
  const props = useSpring({ height: isWinner ? height : 0 });

  console.log(state);

  const playAgain = () => {
    setPlayer(0);
    setState(Array(9).fill(null));
    setIsWinner(false);
    setStatus("Player 0");
    setWinStyles({});
    setPlay(true);
  };

  useEffect(() => {
    const winner = checkWinner(state);

    if (winner != null) {
      setStatus(`Player ${winner[0]} wins`);
      setPlay(false);
      if (winner[1] === "012") {
        setWinStyles({
          transform: "rotate(90deg)",
          top: "-112px",
          left: "222px",
          zIndex: "2",
        });
      } else if (winner[1] === "345") {
        setWinStyles({
          transform: "rotate(90deg)",
          top: "25px",
          left: "222px",
          zIndex: "2",
        });
      } else if (winner[1] === "678") {
        setWinStyles({
          transform: "rotate(90deg)",
          top: "170px",
          left: "222px",
          zIndex: "2",
        });
      } else if (winner[1] === "036") {
        setWinStyles({
          top: "30px",
          left: "80px",
          zIndex: "2",
        });
      } else if (winner[1] === "147") {
        setWinStyles({
          top: "30px",
          left: "222px",
          zIndex: "2",
        });
      } else if (winner[1] === "258") {
        setWinStyles({
          top: "30px",
          left: "364px",
          zIndex: "2",
        });
      } else if (winner[1] === "246") {
        setWinStyles({
          transform: "rotate(45deg) scaleY(1.3)",
          top: "30px",
          left: "222px",
          zIndex: "2",
        });
      } else if (winner[1] === "048") {
        setWinStyles({
          transform: "rotate(-45deg) scaleY(1.3)",
          top: "30px",
          left: "222px",
          zIndex: "2",
        });
      } else {
        setWinStyles({});
      }
      setIsWinner(true);
    }
  }, [state]);

  // console.log(`agregando estado ${JSON.stringify(state)}`);

  const newState = (idOfSquare) => {
    let thePlayer = player;
    const newState = [...state];
    newState[idOfSquare] = player;
    setState(newState);
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    setStatus(`Player ${nextplayer}`);
    return thePlayer;
  };

  // console.log(isWinner);

  // const resetState =()=> {
  //   setState(Array(9).fill(null));
  // }

  function renderSquare(i) {
    return <Square id={i} newState={newState} won={isWinner} play={play} />;
  }

  return (
    <div className="container">
      <div className="game-board">
        <div ref={ref} className="slash" style={winStyles}>
          <animated.div className="win" style={props} />
        </div>
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
      <div className="player">
        <h2>{status}</h2>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
}

export default Board;
