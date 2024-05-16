import { Loader } from "@googlemaps/js-api-loader";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayContext } from "../context/PlayProvider";
import { Link } from "react-router-dom";
import { selectplaceMap } from "../utils/maphelper";
import { checkStreetView } from "../utils/helper";
import { createMap } from "../services/api";
import styles from "../styles/Selectplaces.module.css";
import ErrorDialog from "../components/ErrorDialog";

function Selectplaces() {
  const { mapname, rounds } = useContext(PlayContext);
  const [selectedmaps, setselectedmaps] = useState([]);
  const [currentmap, setcurrentmap] = useState();
  const [errormsg, seterrormsg] = useState();
  const errorRef = useRef(null);
  const nav = useNavigate();

  function handlemapselect() {
    setselectedmaps([...selectedmaps, currentmap]);
  }

  useEffect(() => {
    if (!mapname) {
      nav("/play");
      return;
    }

    async function postcreatedmap(mapname, selectedmaps) {
      if (selectedmaps.length >= rounds) {
        const res = await createMap(mapname, selectedmaps);
        if (res) {
          seterrormsg(res);
          errorRef.current.openDialog();
        } else {
          nav("/play");
        }
      }
    }

    postcreatedmap(mapname, selectedmaps);
  }, [selectedmaps]);

  useEffect(() => {
    selectplaceMap(currentmap, handleMapClick);
  }, [currentmap]);

  const handleMapClick = async (mapsMouseEvent) => {
    const clickedPoint = mapsMouseEvent.latLng.toJSON();
    const res = await checkStreetView(clickedPoint, setcurrentmap);
    if (res) {
      seterrormsg(res);
      errorRef.current.openDialog();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div id="map" className={styles.map} />
        <div id="pano" className={styles.pano} />
      </div>
      <div className={styles.rounds}>
        <div>Round {selectedmaps.length}</div>
      </div>
      <Link className={styles.button} onClick={handlemapselect}>
        Select
      </Link>
      <ErrorDialog ref={errorRef} errormsg={errormsg} />
    </>
  );
}

export default Selectplaces;
