var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const config = require("../configs/auth.config");
const db = require("../models");
const { default: Axios } = require("axios");
const Op = db.Sequelize.Op;
const User = db.user;
const Role = db.role;

exports.register = (req, res) => {
  // TODO upload image ke pihak ke tiga(imgur.com via axios)
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        user.setRoles([2]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        Axios.post("https://api.imgur.com/oauth2/token", {
          grant_type: "refresh_token",
          client_id: "6c38f6da421f912",
          refresh_token: "43f6e4cece6496527753539ac00667136d589c87",
          client_secret: "2a5ecb72d8bd164b175630096556ddd6b1d47471",
        }).then((image) => {
          res.send({
            id: user.id,
            email: user.email,
            roles: authorities,
            accessToken: token,
            accessTokenImage: image.data.access_token,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
