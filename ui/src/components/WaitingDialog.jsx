import React, { forwardRef, useImperativeHandle, useRef } from "react";
import CompassLoader from "./CompassLoader";
import styles from "../styles/WaitingDialog.module.css";

function WaitingDialog({}, ref) {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      openDialog: () => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      },
    };
  });

  return (
    <>
      <dialog className={styles.dialog} ref={dialogRef}>
        <div className={styles.dialogcontainer}>
          <CompassLoader className={styles.loader} />
          <div className={styles.contenttext}>
            wait while everybody complete...
          </div>
        </div>
      </dialog>
    </>
  );
}

export default forwardRef(WaitingDialog);
