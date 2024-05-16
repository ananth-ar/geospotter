import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import Room from "../components/Room";
import GameMap from "../components/GameMap";


function Playtime() {
  const [isgameon, setisgameon] = useState(false);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {isgameon ? (
        <GameMap socket={socket} />
      ) : (
        <Room socket={socket} setisgameon={setisgameon} />
      )}
    </>
  );
}

export default Playtime;
