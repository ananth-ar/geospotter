import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "../styles/ErrorDialog.module.css";
import { forwardRef } from "react";

function ErrorDialog({ errormsg }, ref) {
  const [isopen, setIsopen] = useState(false);
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      openDialog: () => {
        if (dialogRef.current) {
          dialogRef.current.show();
          setIsopen(true);
        }
      },
    };
  });

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  useEffect(() => {
    if (isopen) {
      setTimeout(() => {
        closeDialog();
        setIsopen(false);
      }, "2000");
    }
  }, [isopen]);

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <div className={styles.dialogcontent}>
        <svg
          height="800px"
          width="800px"
          className={styles.svg}
          version="1.1"
          id="Layer_1"
          viewBox="-51.2 -51.2 614.40 614.40"
          xmlSpace="preserve"
          fill="#000000"
          transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="1.024"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              style={{ fill: "#FF7855" }}
              d="M0,256c0,141.384,114.615,256,256,256l22.261-256L256,0C114.615,0,0,114.615,0,256z"
            />{" "}
            <path
              style={{ fill: "#FF562B" }}
              d="M256,0v512c141.384,0,256-114.616,256-256S397.384,0,256,0z"
            />{" "}
            <polygon
              style={{ fill: "#FFFFFF" }}
              points="161.555,114.333 114.333,161.555 208.778,256 114.333,350.445 161.555,397.667 256,303.222 278.261,256 256,208.778 "
            />{" "}
            <polygon
              style={{ fill: "#FFEAC3" }}
              points="397.667,161.555 350.445,114.333 256,208.778 256,303.222 350.445,397.667 397.667,350.445 303.222,256 "
            />{" "}
          </g>
        </svg>
        <p className={styles.p}>{errormsg && errormsg}</p>
      </div>
    </dialog>
  );
}

export default forwardRef(ErrorDialog);
