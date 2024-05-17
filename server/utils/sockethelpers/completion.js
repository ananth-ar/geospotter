const { resultsArray } = require("../queries/mapqueries");
const { markandcheck, markpoints } = require("../queries/userqueries");

async function markandemitonallcomplete(io, name, roomid, points) {
  await markpoints(name, points);
  const allCompleted = await markandcheck(name, roomid);
  if (allCompleted) {
    const results = await resultsArray(roomid);
    io.to(roomid).emit("all-completed", results);
    console.log("results have left " + results + " to " + roomid);
  }
}

module.exports = { markandemitonallcomplete };
