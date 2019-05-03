var express = require("express");
var UserController = require("./controllers/UserController");
var JobsController = require("./controllers/JobsController");
var ResumeController = require("./controllers/ResumesController");
var DataController = require("./controllers/DataController");


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
  apiRoutes.post("/jobs", JobsController.getJobs);
  apiRoutes.get("/job-filters", JobsController.filterJobs);
  apiRoutes.get("/top-five-jobs", JobsController.topFiveJobs);
  apiRoutes.get("/job/:id", JobsController.getJobById);

  //Middleware function to authentication
  // apiRoutes.use(UserController.authenticate);


  apiRoutes.delete("/close-account/:id", UserController.deleteAccount);
  apiRoutes.put("/update-user", UserController.updateUser);
  apiRoutes.get("/user/:id", UserController.getUserById);
  apiRoutes.put("/change-password", UserController.ChangePwd);


  
  apiRoutes.post("/post-job", JobsController.postJob);
 
  // apiRoutes.get("/job-categories", JobsController.getJobCategories);
  // apiRoutes.get("/job-companies", JobsController.getJobCompanies);



  
  apiRoutes.post("/post-resume", ResumeController.postResume);
  apiRoutes.get("/resume/:id", ResumeController.getResume);
  apiRoutes.get("/cities/:stateId", DataController.getCities);
  apiRoutes.get("/states", DataController.getStates);



  app.use("/v1", apiRoutes);
};
