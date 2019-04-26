var express = require("express");
var UserController = require("./controllers/UserController");
var JobsController = require("./controllers/JobsController");
var ResumeController = require("./controllers/ResumesController");

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


  apiRoutes.delete("/close-account/:id", UserController.deleteAccount);
  apiRoutes.put("/update-user", UserController.updateUser);
  apiRoutes.get("/user/:id", UserController.getUserById);


  
  apiRoutes.post("/post-job", JobsController.postJob);
  apiRoutes.get("/jobs", JobsController.getJobs);
  apiRoutes.get("/job/:id", JobsController.getJobById);
  apiRoutes.post("/post-resume", ResumeController.postResume);
  apiRoutes.get("/resume/:id", ResumeController.getResume);

  app.use("/v1", apiRoutes);
};
