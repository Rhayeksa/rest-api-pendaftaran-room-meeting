const express = require("express");
const router = express.Router();
const controller = require("../controllers/room.controller");
const { authJwt } = require("../middlewares");

router.post(
  "/addOne",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.addOne
);
router.get(
  "/viewsAdmin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.findAll
);
router.get(
  "/viewsGuest",
  [authJwt.verifyToken, authJwt.isGuest],
  controller.findAll
);

module.exports = router;
