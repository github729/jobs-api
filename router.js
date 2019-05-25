var express = require("express");
var UserController = require("./controllers/UserController");
var JobsController = require("./controllers/JobsController");
var ResumeController = require("./controllers/ResumesController");
var DataController = require("./controllers/DataController");


module.exports = function(app) {
  app.get("/", (req, res) => {
    res.send("The Jobs Api watch at 1332");
  });

  app.get('/fb', (req, res) => {
    var FB = require('fb');
    FB.setAccessToken('EAACEdEose0cBAJjLjbUmgEgD0BzDxHJltFyLseyBX1mPoRURXNZCvhcbfD88H65l2hLxwbKhEAiyNwUN8Nq3p813opeboTaMFHwY0Ww3Nv0jSstXB5em6xDQwU0gZBaNf9qNcnDBe1QTAqpAntQZCcZB7ZBljeifZB87tK6MmLnS5sNvaDwdeq5nHZASobw1TNSBbuGf1NmpQZDZD');
    var body = 'My first post using facebook-node-sdk';
    FB.api('me/feed', 'post', { message: body, link: 'http://ec2-35-178-115-252.eu-west-2.compute.amazonaws.com/insights/preview/23' }, function (res) {
        if (!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
    });
    res.json({ 'hi': res.id });
});

accessToken = null;

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
