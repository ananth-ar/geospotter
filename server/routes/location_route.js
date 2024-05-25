const express = require("express");
const { getAllMap, getMap, getgamemap, saveMap, savegamemap } = require("../controller/location");

const router = express.Router();

router.get("/", getAllMap);

router.get("/:mapname", getMap);

router.get("/gamemap/:room", getgamemap);

router.post("/", saveMap);

router.post("/gamemap",savegamemap);


module.exports = router;
