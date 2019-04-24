"use strict";
const bcrypt = require("bcrypt-nodejs");
const config = require("../config/config.json")["system"];
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 120],
            msg: "Email address must be between 6 and 120 characters in length"
          },
          isEmail: {
            msg: "Email address must be valid"
          },
          isUnique: function(value, next) {
            var self = this;
            users
              .find({
                where: { email: value },
                attributes: ["id"]
              })
              .done(function(user, error) {
                if (error) {
                  return next(error);
                } else if (user) {
                  if (user && self.email !== user.email) {
                    return next("Email address already in use!");
                  }
                }
                next();
              });
          }
        }
      },
      password: DataTypes.STRING,
      confirmPassword: DataTypes.STRING,
      mobileNumber: DataTypes.STRING,
      city: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      instanceMethods: {
        generateHash: function(password) {
          return bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(config.salt),
            null
          );
        },
        validPassword: function(password, user) {
          return bcrypt.compareSync(password, user.password);
        },
        getFullname: function() {
          return [this.firstname, this.lastname].join(" ");
        }
      }
    }
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  users.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(config.salt), null);
  };
  return users;
};
