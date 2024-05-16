import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import styles from "../styles/CreateMap.module.css";
import { PlayContext } from "../context/PlayProvider";
import { useNavigate } from "react-router-dom";

function SelectDuration({}, ref) {
  const { mapname, rounds, setmapname, setrounds } = useContext(PlayContext);
  const dialogRef = useRef(null);
  const nav = useNavigate();

  function handleset(e) {
    e.preventDefault();
    const input = e.target.elements[0];
    const pattern = new RegExp(input.pattern);

    if (pattern.test(input.value)) {
      nav("/play/selectplaces");
    }
  }

  useImperativeHandle(ref, () => {
    return {
      openDialog: () => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      },
    };
  });

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <div className={styles.closedialog}>
        <a className={styles.a} onClick={closeDialog}>
          x
        </a>
      </div>
      <div className={styles.dialogcontent}>
        <div className={styles.title}>Create Map</div>
        <form className={styles.formcontainer} onSubmit={handleset}>
          <input
            className={styles.input}
            placeholder="enter mapname..."
            pattern="^(?!.*\s$)(?!^\s)(?=.*\S)[\s\S]{3,12}$"
            title="least 3 and at most 12 alphabetic characters"
            onChange={(e) => setmapname(e.target.value)}
            value={mapname}
          />
          <input
            className={styles.input}
            placeholder="enter number of rounds..."
            pattern="^\d{1,1}$"
            title="least 1 and at most 1 numeric characters"
            onChange={(e) => setrounds(e.target.value)}
            value={rounds}
          />
          <button className={styles.inputbtn}>CREATE</button>
        </form>
      </div>
    </dialog>
  );
}

export default forwardRef(SelectDuration);
