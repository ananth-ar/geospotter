const { getGameMap, resultsArray } = require("../queries/mapqueries");
const { listofusersinroom, getUsersReadyInRoom } = require("../queries/userqueries");

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

module.exports = { userreadydisconnect, allcompleteddisconnect };
