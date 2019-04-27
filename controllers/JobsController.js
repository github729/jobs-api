var models = require("../models");
var async = require("async");
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

// exports.getJobs = function(req, res) {
//   let postData = req.body;
//   models.jobs.findAll().then(jobs => {
//     let result = {};
//     if (jobs) {
//       result.success = true;
//       result.jobs = jobs;
//     } else {
//       result.success = false;
//       result.message = "No jobs Found";
//     }
//     res.json(result);
//   });
// };
exports.getJobById = function(req, res) {
  models.jobs
    .findOne({
      where: { id: req.params.id }
    })
    .then(job => {
      let result = {};
      if (job) {
        result.success = true;
        result.data = job;
      } else {
        result.success = false;
        result.message = "No job available";
      }
      res.json(result);
    });
};
exports.getJobLocations = function(req, res) {
  let postData = req.body;
  models.jobs
    .findAll({
      attributes: ["country", "state"],
      group: ["country", "state"]
    })
    .then(locations => {
      let result = {};
      if (locations) {
        result.success = true;
        result.data = locations;
      } else {
        result.success = false;
        result.message = "No job Locations Found";
      }
      res.json(result);
    });
};
exports.getJobCategories = function(req, res) {
  let postData = req.body;
  models.jobs
    .findAll({
      attributes: ["category"],
      group: ["category"]
    })
    .then(categories => {
      let result = {};
      if (categories) {
        result.success = true;
        result.data = categories;
      } else {
        result.success = false;
        result.message = "No job Categories Found";
      }
      res.json(result);
    });
};
exports.getJobCompanies = function(req, res) {
  let postData = req.body;
  models.jobs
    .findAll({
      attributes: ["companyName"],
      group: ["companyName"]
    })
    .then(companies => {
      let result = {};
      if (companies) {
        result.success = true;
        result.data = companies;
      } else {
        result.success = false;
        result.message = "No job Companies Found";
      }
      res.json(result);
    });
};
noResults = (result, response) => {
  result.success = "failure";
  result.message = "Something went wrong";
  response.json(result);
};
exports.filterJobs = (req, res) => {
  filter(req, res, records => {
    return res.json(records);
  });
};
filter = (req, res, cb) => {
  async.parallel(
    [
      callback => {
        models.jobs
          .findAll({ attributes: ["category"], group: ["category"] })
          .then(categories => {
            callback(null, categories);
          })
          .catch(function(err) {
            callback(err);
          });
      },
      callback => {
        models.jobs
          .findAll({
            attributes: ["country", "state"],
            group: ["country", "state"]
          })
          .then(locations => {
            callback(null, locations);
          })
          .catch(function(err) {
            callback(err);
          });
      },
      callback => {
        models.jobs
          .findAll({
            attributes: ["companyName"],
            group: ["companyName"]
          })
          .then(companies => {
            callback(null, companies);
          })
          .catch(function(err) {
            callback(err);
          });
      }
    ],
    (err, results) => {
      let json_res = {};
      if (err) {
        json_res["success"] = false;
        json_res["message"] = err;
        json_res["data"] = [];
      } else {
        json_res["success"] = true;
        json_res["categories"] = results[0];
        json_res["locations"] = results[1];
        json_res["companies"] = results[2];
      }
      cb(json_res);
    }
  );
};
exports.getJobs = (req, res) => {
  jobsFiltration(req, res, records => {
    return res.json(records);
  });
};

//filtering active Jobs
jobsFiltration = (req, res, cb) => {
  postData = req.body;

  let where = {};
  if (Object.keys(postData).length > 2) {
    where = {
      $or: [
        {
          category: {
            $like: postData.category
          }
        },
        {
          state: {
            $like: postData.state
          }
        },
        {
          address: {
            $like: postData.keywords
          }
        },
        {
          jobType: {
            $like: postData.jobType
          }
        },
        {
          experience: {
            $like: postData.experience
          }
        },
        {
          companyName: {
            $like: postData.companyName
          }
        },
        {
          country: {
            $like: postData.location
          }
        },
        {
          state: {
            $like: postData.location
          }
        }
      ]
    };
  }
  async.parallel(
    [
      callback => {
        models.jobs
          .findAll({
            where: where,
            attributes: ["companyName"]
          })
          .then(jobs => {
            callback(null, jobs.length);
          })
          .catch(function(err) {
            callback(err);
          });
      },
      callback => {
        models.jobs
          .findAll({
            where: where,
            limit: postData.limit,
            offset: postData.offset
          })
          .then(jobs => {
            callback(null, jobs);
          })
          .catch(function(err) {
            callback(err);
          });
      }
    ],
    (err, results) => {
      let json_res = {};
      if (err) {
        json_res["success"] = false;
        json_res["recordsTotal"] = 0;
        json_res["recordsFiltered"] = 0;
        json_res["message"] = err;
        json_res["data"] = [];
      } else {
        json_res["success"] = true;
        json_res["recordsTotal"] = results[0];
        json_res["recordsFiltered"] = results[0];
        json_res["data"] = results[1];
      }
      cb(json_res);
    }
  );
};
