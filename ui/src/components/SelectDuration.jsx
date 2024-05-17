import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "../styles/SelectDuration.module.css";
import { createGameMap } from "../services/api";
import { Link } from "react-router-dom";

function SelectDuration({ mapname, round }, ref) {
  const [showroomid, setShowroomid] = useState(false);
  const [roundtime, setroundtime] = useState();
  const [roomid, setroomid] = useState();
  const [isActive, setIsActive] = useState(false);
  const dialogRef = useRef(null);

  async function handledone(e) {
    e.preventDefault();
    const input = e.target.elements[0];
    const pattern = new RegExp(input.pattern);

    if (pattern.test(input.value)) {
      const room = await createGameMap(mapname, roundtime);
      sessionStorage.setItem("room", JSON.stringify(room));
      setroomid(room);
      setShowroomid(true);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(roomid);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 2500);
  };

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
        {showroomid ? (
          <div className={styles.roomidcontainer}>
            <div className={styles.label}>your room id</div>
            <div className={styles.clipboardcontainer}>
              <div className={styles.container}>
                <input
                  type="text"
                  className={styles.text}
                  value={roomid}
                  readOnly
                />
                <button className={styles.button} onClick={handleCopy}>
                  {isActive ? "copied!" : "copy"}
                </button>
              </div>
              <div className={styles.label1}>
                share it with your friends so they can join.
              </div>
            </div>
            <Link className={styles.alink} to={"/play/playtime"}>
              go to room
            </Link>
          </div>
        ) : (
          <div className={styles.inputcontainer}>
            <div className={styles.mapname}>Map Name: {mapname}</div>
            <div className={styles.rounds}>Rounds: {round}</div>
            <form className={styles.formcontainer} onSubmit={handledone}>
              <input
                className={styles.durationinput}
                placeholder="enter duration in seconds..."
                pattern="^\d{1,3}$"
                title="least 1 and at most 3 numeric characters"
                onChange={(e) => setroundtime(e.target.value)}
              />
              <button className={styles.inputbtn}>submit</button>
            </form>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default forwardRef(SelectDuration);
