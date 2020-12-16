var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send({ message: "Welcome to aplikasi pendaftaran ruangan meeting" });
});

module.exports = router;
