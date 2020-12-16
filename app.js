const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./models");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user.router");
const roomsRouter = require("./routes/room.router");
const bookingsRouter = require("./routes/booking.router");

const app = express();

db.sequelize.sync();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);
app.use("/bookings", bookingsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // error message
  res.status(err.status || 500);
  res.send({ err });
});

module.exports = app;
