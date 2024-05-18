const {
  getGameMap,
  resultsArray,
  getGameMapStatus,
  deleteGameMap,
} = require("../queries/mapqueries");
const {
  listofusersinroom,
  getUsersReadyInRoom,
  resetuser,
  numofplayerinroom,
  checkallcompleted,
} = require("../queries/userqueries");
const AsyncLock = require("async-lock");

const lock = new AsyncLock();

async function userreadydisconnect(io, socket, roomid) {
  console.log(io.sockets.adapter.rooms);
  const list = await listofusersinroom(roomid);
  socket.broadcast.emit("ondisconnect-newreadylist", { roomid, list });
  console.log(`new user ready list ${list} is send to room ${roomid}`);
  if (
    (await getUsersReadyInRoom(roomid)) ===
    io.sockets.adapter.rooms.get(roomid).size
  ) {
    const maps = await getGameMap(roomid);
    socket.broadcast.to(roomid).emit("ondisconnect-allready", maps);
  }
}

async function allcompleteddisconnect(socket, roomid) {
  const results = await resultsArray(roomid);
  socket.broadcast
    .to(roomid)
    .emit("ondisconnect-allcompleted", { roomid, results });
  console.log("results have left " + results + " to " + roomid);
}

async function ondisconnect(socket) {
  if (socket.username) {
    const { roomid, gamemap } = await resetuser(socket.username.name);
    console.log(
      `user ${socket.username.name} resetted and the room id ${roomid}`
    );
    if (roomid && gamemap) {
      const { isCompleted, hasStarted } = await getGameMapStatus(roomid);
      console.log(`isCompleted: ${isCompleted}, hasStarted:${hasStarted}`);
      if (isCompleted) {
        await deleteGameMap(roomid);
      } else {
        if (!hasStarted) {
          const islast = await numofplayerinroom(roomid);
          console.log(`islast: ${islast}`);
          if (!islast) {
            await userreadydisconnect(io, socket, roomid);
          }
        } else {
          const allCompleted = await checkallcompleted(roomid);
          if (allCompleted) {
            await allcompleteddisconnect(socket, roomid);
          }
        }
      }
    }
  }
}

async function ondisconnectwithLock(socket) {
  await lock.acquire("ondisconnect", async () => {
    await ondisconnect(socket);
    console.log(
      `user ${socket.username && socket.username.name} with socket id ${
        socket.id
      } has been disconnected`
    );
  });
}

module.exports = {
  userreadydisconnect,
  allcompleteddisconnect,
  ondisconnectwithLock,
};
