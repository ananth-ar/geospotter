const { resultsArray } = require("../queries/mapqueries");
const { markandcheck } = require("../queries/userqueries");

async function markandemitonallcomplete(io, socket, name, roomid) {
  const allCompleted = await markandcheck(name, roomid);
  if (allCompleted) {
    const results = await resultsArray(roomid);
    io.to(roomid).emit("all-completed", results);
    console.log("results have left " + results + " to " + roomid);
  }
}

module.exports = { markandemitonallcomplete };
