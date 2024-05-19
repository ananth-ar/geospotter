import React, { useEffect, useState } from "react";
import GuessLocation from "./GuessLocation";
import ResultPage from "./ResultPage";
import { sessiongamedata } from "../utils/helper";
import { useNavigate } from "react-router-dom";

function GameMap({ socket }) {
  const [toggle, settoggle] = useState(true);
  const [buttondisable, setbuttondisable] = useState(false);
  const [distance, setdistance] = useState(null);
  const [points, setpoints] = useState(0);
  const [urselection, seturselection] = useState(null);
  const nav = useNavigate();

  const { name, roomid, maps, index, streetviewloca } = sessiongamedata(nav);

  useEffect(() => {
    socket.emit("join-room", { name, roomid });

    return () => {
      socket.off("distance");
    };
  }, []);

  return (
    <>
      {toggle ? (
        <GuessLocation
          maps={maps}
          streetviewloca={streetviewloca}
          index={index}
          points={points}
          settoggle={settoggle}
          setdistance={setdistance}
          setpoints={setpoints}
          urselection={urselection}
          seturselection={seturselection}
          buttondisable={buttondisable}
          setbuttondisable={setbuttondisable}
        />
      ) : (
        <ResultPage
          maps={maps}
          roomid={roomid}
          socket={socket}
          points={points}
          streetviewloca={streetviewloca}
          urselection={urselection}
          seturselection={seturselection}
          distance={distance}
          setdistance={setdistance}
          settoggle={settoggle}
        />
      )}
    </>
  );
}

export default GameMap;

