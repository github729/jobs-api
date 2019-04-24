var models = require("../models");

//create users
exports.postJob = function(request, response) {
  let postData = request.body;
  models.jobs.create(postData).then(job => {
    let result = {};
    if (job) {
      if (job) {
        result.success = true;
        result.message = "Job Posted Successfully";
      } else {
        result.success = true;
        result.message = "Job Not Not Successfully";
      }
      response.json(result);
    } else {
      noResults(result, response);
    }
  });
};

exports.getJobs = function (req, res) {
  let postData = req.body;
  let where = {};
  // if (postData.location) {
  //     where = { jlocation: postData.location }
  // }
  // if (postData.skill) {
  //     where = { requiredskills: postData.skill }
  // }
  // if (postData.education) {
  //     where = { jeligibility: postData.education }
  // }
  // if (postData.role) {
  //     where = { jrole: postData.role }
  // }
  // if (postData.type) {
  //     where = { jtype: postData.type }
  // }
  // if (postData.salary) {
  //     where = { jtype: postData.type }
  // }
  models.jobs.findAll({ where: where }).then(jobs => {
      let result = {};
      if (jobs) {
          result.success = true;
          result.jobs = jobs;
      } else {
          result.success = false;
          result.message = 'No jobs Found';
      }
      res.json(result);
  });
}

noResults = (result, response) => {
  result.success = "failure";
  result.message = "Something went wrong";
  response.json(result);
};
