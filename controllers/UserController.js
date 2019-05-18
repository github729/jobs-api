var models = require("../models");
var Sequelize = require("sequelize");
var jwt = require("jsonwebtoken");
var config = require("./../config/config.json")["system"];

exports.authenticate = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token ||
    req.query.token ||
    req.headers["authorization"] ||
    req.headers["Authorization"];
  if (token) {
    jwt.verify(token, config.jwt_secretkey, function (err, decoded) {
      if (err) {
        return res.status(201).json({
          success: false,
          message: "Authenticate token expired, please login again.",
          errcode: "exp-token"
        });
      } else {
        req.decoded = decoded;
        req.app.locals.decodedData = decoded;
        next();
      }
    });
  } else {
    return res.status(201).json({
      success: false,
      message: "Fatal error, Authenticate token not available.",
      errcode: "no-token"
    });
  }
};

exports.Login = function (req, res, next) {
  models.users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(function (user) {
      if (!user) {
        res
          .status(201)
          .json({
            success: false,
            message: "Incorrect login credentials."
          });
      } else if (user) {
        if (
          user._modelOptions.instanceMethods.validPassword(
            req.body.password,
            user
          )
        ) {
          var token = jwt.sign(user.toJSON(), config.jwt_secretkey, {
            expiresIn: config.jwt_expire
          });
          res.status(200).json({
            success: true,
            data: user,
            data: {
              'id': user.id,
              'email': user.email,
              'mobileNumber': user.mobileNumber,
              'name': user.name,
              'role': user.role
            },
            token: token
          });
        } else {
          res
            .status(200)
            .json({
              success: false,
              message: "Incorrect login credentials."
            });
        }
      }
    });
};

//create users
exports.Register = function (request, response) {
  let postData = request.body;

  models.users.findOne({
    where: {
      email: postData.email
    }
  }).then(user => {
    let result = {};
    if (user) {
      result.success = false;
      result.message = "User already existed.";
      response.json(result);
    } else {
      if (postData.password !== null) {
        postData.password = models.users.generateHash(postData.password);
      }
      models.users.create(postData).then(user => {
        if (user) {
          if (user) {
            result.success = true;
            result.message = "User Successfully Registered";
          } else {
            result.success = true;
            result.message = "User Not Successfully Registered";
          }
          response.json(result);
        } else {
          noResults(result, response);
        }
      });
    }
  });
};

exports.getUserById = function (req, res) {
  models.users
    .findOne({
      attributes: ["name", "city", "role", "mobileNumber", "email"],
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      let result = {};
      if (user) {
        result.success = true;
        result.data = user;
      } else {
        result.success = false;
        result.message = "No user available";
      }
      res.json(result);
    });
};

exports.updateUser = function (req, res) {
  let postData = req.body;
  models.users
    .findOne({
      where: {
        id: postData.userId
      },
      required: false
    })
    .then(user => {
      let result = {};
      if (user) {
        user
          .updateAttributes(postData)
          .then(updateUser => {
            if (updateUser) {
              result.success = true;
              result.message = "User Updated successfully ";
            } else {
              result.success = true;
              result.message = "User Not Updated successfully ";
            }
            res.json(result);
          })
          .catch(Sequelize.ValidationError, function (err) {
            // respond with validation errors
            return res.status(200).json({
              success: false,
              message: err.message
            });
          })
          .catch(function (err) {
            // every other error
            return res.status(400).json({
              success: false,
              message: err
            });
          });
      } else {
        result.success = false;
        result.message = "User not existed.";
        res.json(result);
      }
    });
};

exports.deleteAccount = function (req, res) {
  let result = {};
  if (req.params.id != undefined) {
    models.users.destroy({
      where: {
        id: req.params.id
      }
    }).then(
      rowDeleted => {
        result.success = true;
        result.message =
          rowDeleted === 1 ?
          "Your Account is Closed successfully" :
          "Unable to Close Your Account";
        res.json(result);
      },
      err => {
        result.success = false;
        result.message = "All Applied Jobs are Moved";
        res.json(result);
      }
    );
  } else {
    result.success = false;
    result.message = "Not selected any User";
    res.json(result);
  }
};

exports.ChangePwd = (req, res) => {
  models.users
    .findOne({
      where: {
        id: req.body.userId
      }
    })
    .then(user => {
      if (user) {
        if (req.body.newPassword === req.body.confirm_password) {
          let updateData = {};
          updateData.newPassword = models.users.generateHash(req.body.newPassword);
          user.updateAttributes(updateData).then(updatedUser => {
            if (updatedUser) {
              return res.json({
                success: true,
                message: "Password changed successfully"
              });
            } else {
              return done(err);
            }
          });
        } else {
          return res.status(422).json({
            success: false,
            message: "Passwords do not match"
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Password Not changed."
        });
      }
    })
    .catch(function (err) {
      // every other error
      return res.status(400).json({
        success: false,
        message: err
      });
    });
};

noResults = (result, response) => {
  result.success = "failure";
  result.message = "Something went wrong";
  response.json(result);
};