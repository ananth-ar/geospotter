import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { savegamename } from "../services/api";
import styles from "../styles/Gamename.module.css";
import ErrorDialog from "../components/ErrorDialog";

function Gamename() {
  const [gamename, setgamename] = useState();
  const [errormsg, seterrormsg] = useState();
  const errorRef = useRef(null);
  const nav = useNavigate();
  const name = { name: gamename };

  async function handleGO(e) {
    e.preventDefault();
    const input = e.target.elements[0];
    const pattern = new RegExp(input.pattern);

    if (pattern.test(input.value)) {
      const res = await savegamename(name, nav);
      if (res) {
        seterrormsg(res);
        errorRef.current.openDialog();
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <form className={styles.formcontainer} onSubmit={handleGO}>
            <input
              className={styles.input}
              type="text"
              required
              onChange={(e) => setgamename(e.target.value)}
              pattern="^(?!.*\s$)(?!^\s)(?=.*\S)[\s\S]{3,12}$"
              title="least 3 and at most 12 alphabetic characters"
              placeholder="enter a gamename..."
            ></input>
            <button className={styles.button}>GO</button>
          </form>
        </div>
      </div>
      <ErrorDialog ref={errorRef} errormsg={errormsg} />
    </>
  );
}

export default Gamename;
