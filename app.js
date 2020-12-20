const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./models");
const Role = db.role;
const User = db.user;
const roomsRouter = require("./routes/room.router");
const bookingsRouter = require("./routes/booking.router");
const authRouter = require("./routes/auth.router");

db.sequelize.sync(() => {
  Role.create({
    id: 1,
    name: "admin",
  });
  Role.create({
    id: 2,
    name: "guest",
  });
  User.create({
    id: 1,
    email: "admin@gmail.com",
    password: "$2b$08$yvN5dXdFmLlsDIqTuQMSJ.FqovJXRUesLWIXT1lXsCVCfsLzUb8Cu", // 12345
  }).then((user) => {
    user.setRoles([1]);
  });
});

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// router
app.use("/rooms", roomsRouter);
app.use("/bookings", bookingsRouter);
app.use("/auth", authRouter);

// home
app.get("/", (req, res, next) => {
  res.send({ message: "Welcome to aplikasi pendaftaran ruangan meeting" });
});

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
