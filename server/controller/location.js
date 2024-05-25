const {
  getallmap,
  getmap,
  getGameMap,
  savemap,
  saveGameMap,
} = require("../services/map");

const getAllMap = async (req, res) => {
  try {
    const maps = await getallmap();
    res.send(maps);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

const getMap = async (req, res) => {
  try {
    const map = await getmap(req.params.mapname);
    res.send(map);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

const getgamemap = async (req, res) => {
  try {
    const map = await getGameMap(req.params.room);
    res.send(map);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

const saveMap = async (req, res) => {
  try {
    const { mapname, location } = req.body;
    const result = await savemap(mapname, location);
    if (result === "Name already taken") {
      res.status(400).send("Name already taken");
    } else {
      res.status(200).send("Map saved successfully");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

const savegamemap = async (req, res) => {
  try {
    const { room, roundtime, mapname } = req.body;
    const result = await saveGameMap(room, roundtime, mapname);
    res.status(200).send("GameMap saved successfully");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

module.exports = {
  getAllMap,
  getMap,
  getgamemap,
  saveMap,
  savegamemap,
};
