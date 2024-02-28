import { useEffect, useState } from "react";

function Square({ id, newState, won, play }) {
  const [status, setStatus] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const xo = ["O", "X"];

  useEffect(() => {
    setDisabled(won);
    if (play) setStatus(null);
  }, [won]);

  const hadleClicOne = (e) => {
    if (status === null) {
      let nextplayer = newState(id);
      setStatus(nextplayer);
    }
  };

  console.log("status", status);

  return (
    <button disabled={disabled} onClick={hadleClicOne}>
      {xo[status]}
    </button>
  );
}

export default Square;
