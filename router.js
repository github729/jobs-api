var express = require("express");
var UserController = require("./controllers/UserController");
var JobsController = require("./controllers/JobsController");


module.exports = function(app) {
  app.get("/", (req, res) => {
    res.send("The Jobs Api watch at 1332");
  });
  var apiRoutes = express.Router();

  apiRoutes.get("/", (req, res) => {
    res.send("Welcome to Jobs Api");
  });
  //user urls
  apiRoutes.post("/sign-up", UserController.Register);
  apiRoutes.post("/sign-in", UserController.Login);

  //Middleware function to authentication
  // apiRoutes.use(UserController.authenticate);

  apiRoutes.post("/post-job", JobsController.postJob);
  apiRoutes.get("/jobs", JobsController.getJobs);


  app.use("/v1", apiRoutes);
};
