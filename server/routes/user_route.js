const express = require("express");
const { getListofUsersinRoom, getResults, createUser, joinRoom, makeUserReady, markPoints } = require("../controller/user");

const router = express.Router();

router.get("/getlistofusersinroom/:room",getListofUsersinRoom);

router.get("/getresults/:room",getResults);

router.post("/",createUser);

router.post("/joinroom", joinRoom);

router.post("/makeready", makeUserReady);


module.exports = router;
