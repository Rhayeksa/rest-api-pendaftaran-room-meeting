const fs = require("fs");
const db = require("../models");
const Model = db.room;

// TODO upload image ke pihak ke tiga(image hosting)
exports.addOne = async (req, res) => {
  const request = {
    room_name: req.body.room_name,
    room_capacity: req.body.room_capacity,
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

exports.findAll = async (req, res) => {
  Model.findAll()
    .then((data) => {
      if (data == 0) {
        res.send({
          message: "Empty!",
          data: data,
        });
      } else {
        res.send({
          message: "Successed",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.send({
        message: err.errors[0].message,
        data: null,
      });
    });
};
