const { resultsArray } = require("../services/map");
const { listofusersinroom, createuser, joinroom, markpoints } = require("../services/user");

const getListofUsersinRoom = async (req, res) => {
  try {
    const result = await listofusersinroom(req.params.room);
    res.send(result);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

const getResults = async (req, res) => {
  try {
    const result = await resultsArray(req.params.room);
    res.send(result);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

const createUser = async (req, res) => {
  try {
    const result = await createuser(req.body.name);

    if (result === "Name already taken") {
      res.status(400).send("Name already taken");
    } else {
      res.status(200).send("user created successfully");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

const joinRoom = async (req, res) => {
  try {
    const result = await joinroom(req.body.name, req.body.room);
    res.status(200).send("User joined the room successfully");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};

const makeUserReady = async (req, res) => {
  try {
    const result = await makeready(req.body.name);
    res.status(200).send("User marked ready successfully");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
};



module.exports = {
  getListofUsersinRoom,
  getResults,
  createUser,
  joinRoom,
  makeUserReady,
};