module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define(
    "booking",
    {
      total_person: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your total_person",
          },
        },
      },
      booking_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your booking_time",
          },
        },
      },
      noted: {
        type: Sequelize.TEXT,
      },
      check_in_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your check_in_time",
          },
        },
      },
      check_out_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your check_out_time",
          },
        },
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

  return Booking;
};
