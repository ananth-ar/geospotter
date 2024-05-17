import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { resultmap } from "../utils/maphelper";
import WaitingDialog from "./WaitingDialog";
import styles from "../styles/ResultPage.module.css";

const ResultPage = ({
  maps,
  roomid,
  socket,
  points,
  streetviewloca,
  urselection,
  seturselection,
  distance,
  setdistance,
  settoggle,
}) => {
  const showwaitingRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    socket.on("all-completed", (results) => {
      results.sort((a, b) => b.points - a.points);
      sessionStorage.setItem("results", JSON.stringify(results));
      sessionStorage.removeItem("maps");
      sessionStorage.removeItem("index");
      sessionStorage.removeItem("room");
      nav("/play/scores");
    });

    socket.on("ondisconnect-allcompleted", ({ roomid, results }) => {
      const room = JSON.parse(sessionStorage.getItem("room"));
      if (roomid == room) {
        console.log(roomid);
        sessionStorage.setItem("results", JSON.stringify(results));
        sessionStorage.removeItem("maps");
        sessionStorage.removeItem("index");
        sessionStorage.removeItem("room");
        nav("/play/scores");
      }
    });

    resultmap(streetviewloca, urselection);
  }, []);

  function handlenext() {
    const val = JSON.parse(sessionStorage.getItem("index")) + 1;
    sessionStorage.setItem("index", JSON.stringify(val));
    if (maps.location.location.length <= val) {
      const name = JSON.parse(sessionStorage.getItem("name"));
      socket.emit("completed", { name, roomid, points });
      showwaitingRef.current.openDialog();
    } else {
      setdistance(null);
      settoggle(true);
    }
    seturselection("");
  }

  return (
    <>
      <div>
        <div id="map" className={styles.map} />
        <div className={styles.infoBox}>
          {distance && <h2>{distance + " KM"}</h2>}
          <Link className={styles.button} onClick={handlenext}>
            Next
          </Link>
        </div>
      </div>
      <WaitingDialog ref={showwaitingRef} />
    </>
  );
};

export default ResultPage;
