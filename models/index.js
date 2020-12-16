const dbConfig = require("../configs/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

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
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// Foo.hasOne(Bar);
// Bar.belongsTo(Foo, {
//   foreignKey: {
//     name: "myFooId",
//   },
// });

db.ROLES = ["admin", "guest"];

module.exports = db;
