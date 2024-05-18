import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getfromSessionStorage } from "../utils/helper";
import styles from "../styles/Room.module.css";
import ErrorDialog from "./ErrorDialog";

function Room({ socket, setisgameon }) {
  const [seconds, setseconds] = useState();
  const [players, setplayers] = useState();
  const [roomid, setroomid] = useState();
  const [ready, setReady] = useState(false);
  const [buttondisabled, setbuttondisabled] = useState(false);
  const [inputbtndisabled, setinputbtndisabled] = useState(false);
  const [errormsg, seterrormsg] = useState();
  const errorRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    socket.on("newreadylist", (list) => {
      setplayers(list);
      setinputbtndisabled(false);
    });

    socket.on("ondisconnect-newreadylist", ({ roomid, list }) => {
      const room = JSON.parse(sessionStorage.getItem("room"));

      if (roomid == room) {
        setplayers(list);
      }
    });

    socket.on("allready", (maps) => {
      sessionStorage.setItem("maps", JSON.stringify(maps));
      sessionStorage.setItem("index", JSON.stringify(0));
      setseconds(5);
      setbuttondisabled(true);
    });

    socket.on("ondisconnect-allready", (maps) => {
      sessionStorage.setItem("maps", JSON.stringify(maps));
      sessionStorage.setItem("index", JSON.stringify(0));
      setseconds(5);
      setbuttondisabled(true);
    });

    socket.on("join-status", (status) => {
      if (status === "Invalid room id") {
        seterrormsg("Invalid room id");
        errorRef.current.openDialog();
        setinputbtndisabled(false);
      } else if (status === "Match has already started") {
        seterrormsg(
          "Error: Room already in use. Please avoid refreshing during gameplay."
        );
        errorRef.current.openDialog();
        setinputbtndisabled(false);
      }
    });

    const name = getfromSessionStorage("name", nav);
    const roomid = JSON.parse(sessionStorage.getItem("room"));
    if (roomid) {
      setinputbtndisabled(true);
      socket.emit("join-room", { name, roomid });
    }

    return () => {
      socket.off("newreadylist");
      socket.off("allready");
      socket.off("hasStarted");
      socket.off("join-status");
      socket.off("ondisconnect-newreadylist");
      socket.off("ondisconnect-allready");
    };
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setisgameon(true);
      return;
    }

    const timeout = setTimeout(() => {
      setseconds(seconds - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [seconds]);

  useEffect(() => {
    if (players) {
      const { name } = getfromSessionStorage("name", nav);
      const person = players.find((obj) => obj.name == name);
      setReady(person.isReady);
    }
  }, [players]);

  function handlejoin(e) {
    e.preventDefault();
    const input = e.target.elements[0];
    const pattern = new RegExp(input.pattern);

    if (pattern.test(input.value)) {
      setinputbtndisabled(true);
      const name = getfromSessionStorage("name", nav);
      socket.emit("join-room", { name, roomid });
      sessionStorage.setItem("room", JSON.stringify(roomid));
    }
  }

  function handleuserready() {
    const name = getfromSessionStorage("name", nav);
    const roomid = getfromSessionStorage("room", nav);
    socket.emit("user-ready", { name, roomid });
    setReady(!ready);
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          {players ? (
            <div>
              <div className={styles.roomcontainer}>
                <div className={styles.roommain}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.tablehead1}>Players</th>
                        <th className={styles.tablehead2}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((item) => (
                        <tr className={styles.item} key={item.name}>
                          <td className={styles.cell1}>{item.name}</td>
                          <td className={styles.cell2}>
                            {item.isReady ? (
                              <span className={styles.spanready}>Ready</span>
                            ) : (
                              <span className={styles.spannotready}>
                                Not-Ready
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={styles.btncontainer}>
                <button
                  disabled={buttondisabled}
                  className={styles.button}
                  onClick={handleuserready}
                >
                  {buttondisabled
                    ? `Starts in ${seconds}`
                    : ready
                    ? "UnReady"
                    : "Ready"}
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.joinroomcontainer}>
              <form className={styles.formcontainer} onSubmit={handlejoin}>
                <input
                  className={styles.joinroominput}
                  placeholder="enter room id..."
                  pattern="^\d{3,12}$"
                  title="least 3 and at most 12 numeric characters"
                  onChange={(e) => setroomid(e.target.value)}
                  value={roomid}
                />
                <button disabled={inputbtndisabled} className={styles.inputbtn}>
                  {inputbtndisabled ? (
                    <div className={styles.loader}></div>
                  ) : (
                    "JOIN"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <ErrorDialog ref={errorRef} errormsg={errormsg} />
    </>
  );
}

export default Room;

// export function isroompresnt() {

//   return null;
// }
