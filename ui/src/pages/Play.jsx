import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Play.module.css";
import CreateMap from "../components/CreateMap";

function Play() {
  const createmapRef = useRef(null);

  function handlecreatmap() {
    createmapRef.current.openDialog();
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Welcome to Geospotter</h1>
          <div className={styles.buttoncontainer}>
            <Link className={styles.button} to={"/play/playmap"}>
              Play Map
            </Link>
            <Link className={styles.button} to={"/play/playtime"}>
              Join
            </Link>
            <Link onClick={handlecreatmap} className={styles.button}>
              Create Map
            </Link>
          </div>
          <CreateMap ref={createmapRef} />
        </div>
      </div>
    </>
  );
}

export default Play;
