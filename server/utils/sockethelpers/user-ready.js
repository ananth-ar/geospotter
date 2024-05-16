const { getGameMap } = require("../queries/mapqueries");
const { listofusersinroom, getUsersReadyInRoom } = require("../queries/userqueries");

async function readylist(io, roomid) {
  const list = await listofusersinroom(roomid);
  io.to(roomid).emit("newreadylist", list);
}

async function emitmapifallready(io, roomid) {
  if (
    (await getUsersReadyInRoom(roomid)) ===
    io.sockets.adapter.rooms.get(roomid).size
  ) {
    const maps = await getGameMap(roomid);
    io.to(roomid).emit("allready", maps);
    console.log(`maps is send to ${roomid}`);
  }
}

module.exports = { readylist, emitmapifallready };
