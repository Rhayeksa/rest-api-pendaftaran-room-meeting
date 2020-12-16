const fs = require("fs");
const db = require("../models");
const Model = db.user;

// TODO upload image ke pihak ke tiga(image hosting)
exports.addOne = async (req, res) => {
  const request = {
    email: req.body.email,
    password: req.body.password,
    // photo: fs.readFileSync(__dirnam),
  };
  Model.create(request)
    .then((data) => {
      res.status(200).send({
        message: "Successed",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.errors[0].message,
        data: null,
      });
    });
};
