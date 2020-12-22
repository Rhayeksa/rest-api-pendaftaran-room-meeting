const db = require("../models");
const Op = db.Sequelize.Op;
const Booking = db.booking;
const Room = db.room;
db.sequelize.sync();

exports.addOne = async (req, res) => {
  if (req.body.user_id == 1) {
    res.send({
      message: "Admin can't book",
      data: null,
    });
    return null;
  }
  const request = {
    total_person: req.body.total_person,
    booking_time: req.body.booking_time,
    noted: req.body.noted,
    check_in_time: req.body.check_in_time,
    check_out_time: req.body.check_out_time,
    user_id: req.body.user_id,
    room_id: req.body.room_id,
    // photo: fs.readFileSync(__dirnam),
  };
  Booking.create(request)
    .then((data) => {
      res.send({
        message: "Successed",
        data: data,
      });
    })
    .catch((err) => {
      res.send({
        message: err.errors[0].message,
        data: null,
      });
    });
};

exports.findAll = (req, res) => {
  Booking.findAll({
    include: ["room", "user"],
  })
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
