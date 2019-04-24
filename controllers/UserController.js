var models = require("../models");
var Sequelize = require("sequelize");
var jwt = require("jsonwebtoken");
var config = require("./../config/config.json")["system"];

exports.authenticate = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token ||
    req.query.token ||
    req.headers["authorization"] ||
    req.headers["Authorization"];
  if (token) {
    jwt.verify(token, config.jwt_secretkey, function(err, decoded) {
      if (err) {
        return res
          .status(201)
          .json({
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

exports.Login = function(req, res, next) {
  models.users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(function(user) {
      if (!user) {
        res
          .status(201)
          .json({ success: false, message: "Incorrect login credentials." });
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
            token: token
          });
        } else {
          res
            .status(200)
            .json({ success: false, message: "Incorrect login credentials." });
        }
      }
    });
};

//create users
exports.Register = function(request, response) {
  let postData = request.body;

  models.users.findOne({ where: { email: postData.email } }).then(user => {
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

noResults = (result, response) => {
  result.success = "failure";
  result.message = "Something went wrong";
  response.json(result);
};
