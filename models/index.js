const dbConfig = require("../configs/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.hosting.DB,
  dbConfig.hosting.USER,
  dbConfig.hosting.PASSWORD,
  {
    host: dbConfig.hosting.HOST,
    dialect: dbConfig.hosting.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.hosting.pool.max,
      min: dbConfig.hosting.pool.min,
      acquire: dbConfig.hosting.pool.acquire,
      idle: dbConfig.hosting.pool.idle,
    },
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.role = require("./role.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.room = require("./room.model")(sequelize, Sequelize);
db.booking = require("./booking.model")(sequelize, Sequelize);

db.booking.belongsTo(db.user, {
  foreignKey: "user_id",
});
db.booking.belongsTo(db.room, {
  foreignKey: "room_id",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id",
});

db.ROLES = ["admin", "guest"];

module.exports = db;
