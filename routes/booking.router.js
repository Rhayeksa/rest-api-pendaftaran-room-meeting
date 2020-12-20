const express = require("express");
const router = express.Router();
const controller = require("../controllers/booking.controller");
const { authJwt } = require("../middlewares");

router.post(
  "/addOne",
  [authJwt.verifyToken, authJwt.isGuest],
  controller.addOne
);
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

module.exports = router;
