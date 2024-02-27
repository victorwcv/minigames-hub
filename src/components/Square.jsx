import { useState } from "react";

function Square({ id, newState,}) {
  const [status, setStatus] = useState(null);
  const xo = ["O", "X"];

  const hadleClicOne = () => {
    let nextplayer = newState(id);
    setStatus(nextplayer);
  };

 

  const clickHandler = () => {
    hadleClicOne();
  
  };

  return <button onClick={clickHandler}>{xo[status]}</button>;
}

export default Square;
