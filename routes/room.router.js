const express = require("express");
const router = express.Router();
const controller = require("../controllers/room.controller");

router.post("/addOne", controller.addOne);
router.get("/", controller.findAll);

module.exports = router;
