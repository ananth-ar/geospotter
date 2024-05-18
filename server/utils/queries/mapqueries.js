const User = require("../../models/user_model");
const GameMap = require("../../models/gameMap_model");
const Location = require("../../models/location_model");

async function savemap(mapname, location) {
  const existingmap = await Location.findOne({ mapname });
  if (existingmap) {
    console.log("Name already taken");
    return "Name already taken";
  }

  const locationInstance = new Location({
    mapname: mapname,
    location: location,
  });

  await locationInstance.save();
}

async function getallmap() {
  const mapobj = await Location.find();
  return mapobj;
}

async function getmap(mapname) {
  
  const mapobj = await Location.findOne({ mapname });
  return mapobj;
}

async function saveGameMap(room, roundtime, mapname) {
  const mapobj = await Location.findOne(
    { mapname },
    { mapname: 0, location: 0 }
  );
  let gamemap = new GameMap({
    room: room,
    roundtime: roundtime,
    hasStarted: false,
    isCompleted: false,
    location: mapobj,
  });
  await gamemap.save();
}

async function getGameMap(room) {
  let gamemap = await GameMap.findOne({ room: room });
  gamemap.hasStarted = true;
  await gamemap.save();
  let map = await GameMap.findOne({ room: room }).populate("location");
  return map;
}

async function resultsArray(room) {
  let gamemap = await GameMap.findOne({ room: room });
  if (gamemap) {
    gamemap.isCompleted = true;
    await gamemap.save();
  }

  let list = await User.find({ room: room }, { _id: 0, name: 1, points: 1 });
  return list;
}

async function getGameMapStatus(room) {
  try {
    let gamemap = await GameMap.findOne({ room: room });
    console.log(`gamemap: ${gamemap} of room ${room}`);
    const isCompleted = gamemap.isCompleted;
    const hasStarted = gamemap.hasStarted;
    return { isCompleted, hasStarted };
  } catch (error) {
    console.log("error while getting gamemap status " + error);
  }
}

async function deleteGameMap(room) {
  try {
    await GameMap.deleteOne({ room: room });
    console.log(`gamemap of room ${room} is deleted!`)
  } catch (error) {
    console.log("error while deleting gamemap" + error);
  }
}

module.exports = {
  savemap,
  getallmap,
  getmap,
  saveGameMap,
  getGameMap,
  resultsArray,
  getGameMapStatus,
  deleteGameMap,
};
