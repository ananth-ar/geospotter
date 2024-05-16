import React, { useEffect, useRef, useState } from "react";
import { getMap, getallMaps } from "../services/api";
import styles from "../styles/PlayMap.module.css";
import SelectDuration from "../components/SelectDuration";

function PlayMap() {
  const [maps, setmaps] = useState();
  const [mapname, setmapname] = useState();
  const [round, setround] = useState();
  const selectdurationRef = useRef(null);

  useEffect(() => {
    getallMaps(setmaps);
  }, []);

  async function handlemapname(map) {
    const mapobj = await getMap(map);
    setmapname(mapobj.mapname);
    setround(mapobj.location.length);
    selectdurationRef.current.openDialog();
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Maps</h1>
          <div className={styles.body}>
            {maps && (
              <div
                className={styles.list}
                style={{ "--length": 20 }}
                role="list"
              >
                {maps.map((item, index) => (
                  <li
                    key={item.mapname}
                    className={styles.listItem}
                    style={{ "--i": index + 1 }}
                  >
                    <h3 className={styles.heading}>{item.mapname}</h3>
                    <div className={styles.listcontainer}>
                      <h3 className={styles.h3}>
                        Rounds {item.location.length}
                      </h3>
                      <button
                        onClick={() => handlemapname(item.mapname)}
                        className={styles.button}
                      >
                        Select
                      </button>
                    </div>
                  </li>
                ))}
              </div>
            )}
          </div>
          <SelectDuration
            ref={selectdurationRef}
            mapname={mapname}
            round={round}
          />
        </div>
      </div>
    </>
  );
}

export default PlayMap;
