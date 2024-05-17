import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { guesspano, markguess } from "../utils/maphelper";
import styles from "../styles/GuessLocation.module.css";
import SvgMapExpandIcon from "./SvgMapExpandIcon";
import { calculateDistance } from "../utils/calculateDistance";

function GuessLocation({
  // socket,
  // name,
  maps,
  streetviewloca,
  index,
  points,
  settoggle,
  setdistance,
  setpoints,
  urselection,
  seturselection,
  buttondisable,
  setbuttondisable,
}) {
  const [mark, setmark] = useState();
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(maps.roundtime);

  useEffect(() => {
    if (timeLeft === 0) {
      markpoints();
    }

    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    guesspano(streetviewloca);
  }, []);

  useEffect(() => {
    markguess(mark, setmarker);
  }, [mark]);

  const setmarker = (mapsMouseEvent) => {
    const clickedPoint = mapsMouseEvent.latLng.toJSON();
    seturselection(clickedPoint);
    setmark(clickedPoint);
  };

  function markpoints() {
    setbuttondisable(true);
    // const mapname = maps.location.mapname;
    // socket.emit("user-guess", { name, mapname, urselection, index });
    const distance = calculateDistance(streetviewloca, urselection);
    if (distance != null) {
      let formattedNumber = distance.toFixed(1);
      setdistance(formattedNumber);
    }
    if (distance != null && distance < 2500) {
      let point = 250 - Math.floor(distance / 10);
      setpoints(points + point);
    }
    seturselection(null);
    settoggle(false);
    setbuttondisable(false);
  }

  return (
    <>
      <div id="map" />
      <div className={styles.container}>
        <div id="pano" className={styles.pano} />
        <div
          id="map1"
          className={styles.map1}
          style={{
            width: expanded ? "400px" : "0px",
            height: expanded ? "400px" : "0px",
          }}
        ></div>
        <button
          className={styles.button}
          disabled={buttondisable}
          style={{
            width: expanded ? "400px" : "0px",
            height: expanded ? "30px" : "0px",
          }}
          onClick={markpoints}
        >
          {expanded && "SUBMIT"}
        </button>
        <div className={styles.roundIndicator}>Round: {index + 1}</div>
        <div className={styles.timerIndicator}>Time left: {timeLeft}</div>
        <a className={styles.expandLink} onClick={() => setExpanded(!expanded)}>
          <SvgMapExpandIcon />
        </a>
      </div>
    </>
  );
}

export default GuessLocation;
