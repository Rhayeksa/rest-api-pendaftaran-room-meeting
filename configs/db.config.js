exports.hosting = {
  HOST: "sql12.freemysqlhosting.net",
  USER: "sql12382542",
  PASSWORD: "9GzelBGuRu",
  DB: "sql12382542",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

exports.local = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "",
  DB: "room_meeting_rest_api",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
