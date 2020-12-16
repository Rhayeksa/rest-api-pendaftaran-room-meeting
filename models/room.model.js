module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define(
    "room",
    {
      room_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your room_name",
          },
        },
      },
      room_capacity: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your room_capacity",
          },
        },
      },
      photo: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      createdAt: "create_at",
      updatedAt: "update_at",
      deletedAt: "deleted_at",
    }
  );

  return Room;
};
