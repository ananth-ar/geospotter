import React, { useEffect, useState } from "react";
import ScoreTable from "../components/ScoreTable";
import styles from "../styles/Scores.module.css";
import { Link } from "react-router-dom";

function Scores() {
  const [resultarray, setresultarray] = useState();
  const [isreceived, setisreceived] = useState(false);
 

  useEffect(() => {
    const results = JSON.parse(sessionStorage.getItem("results"));
    if (results) {
      setresultarray(results);
      setisreceived(true);
    }
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.h2}>RESULT</h2>
          </div>
          {isreceived && <ScoreTable resultarray={resultarray} />}
          <Link to="/play" className={styles.alink}>
            play again
          </Link>
        </div>
      </div>
    </>
  );
}

export default Scores;
