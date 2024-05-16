const express = require("express");
const { listofusersinroom, createuser, joinroom, makeready, markpoints } = require("../utils/queries/userqueries");
const { resultsArray, getdistanceandpoint } = require("../utils/queries/mapqueries");

const router = express.Router();

router.get("/getlistofusersinroom/:room", async (req, res) => {
  try {
    const result = await listofusersinroom(req.params.room);
    res.send(result);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
});

router.get("/getresults/:room", async (req, res) => {
  try {
    const result = await resultsArray(req.params.room);
    res.send(result);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
});

router.post("/", async (req, res) => {
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
});

router.post("/joinroom", async (req, res) => {
  try {
    const result = await joinroom(req.body.name, req.body.room);
    res.status(200).send("User joined the room successfully");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
});

router.post("/makeready", async (req, res) => {
  try {
    const result = await makeready(req.body.name);
    res.status(200).send("User marked ready successfully");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
});

router.post("/markpoints", async (req, res) => {
  try {
    const { mapname, location, index } = req.body;
    const { point, distance } = getdistanceandpoint(mapname, location, index);
    await markpoints(req.body.name, point);
    res.send(distance);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
