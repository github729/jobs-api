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
exports.topFiveJobs = function(req, res) {
  models.jobs
    .findAll({
      attributes: [
        "id",
        "category",
        "companyName",
        "minSalary",
        "maxSalary",
        "jobType",
        "city",
        "title",
        "state"
      ],
      order: [["createdAt", "DESC"]],
      limit: 5
    })
    .then(jobs => {
      let result = {};
      if (jobs) {
        result.success = true;
        result.data = jobs;
      } else {
        result.success = false;
        result.message = "No jobs Found";
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
            attributes: ["state", "city"],
            group:["city"]
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
  let likeCond = [];
  let orCondition = [];
  if (Object.keys(postData).length > 2) {
    if (postData.category) {
      let item = {
        category: {
          $like: postData.category
        }
      };
      likeCond.push(item);
    }
    if (postData.keywords) {
      let item = {
        requirements: {
          $like: postData.keywords
        }
      };
      orCondition.push(item);
    }
    if (postData.keywords) {
      let item = {
        function: {
          $like: postData.keywords
        }
      };
      orCondition.push(item);
    }
    if (postData.city) {
      let item = {
        city: {
          $like: postData.city
        }
      };
      likeCond.push(item);
    }
    if (postData.jobType) {
      let item = {
        jobType: {
          $like: postData.jobType
        }
      };
      likeCond.push(item);
    }
    if (postData.experience) {
      let item = {
        experience: {
          $like: postData.experience
        }
      };
      likeCond.push(item);
    }
    if (postData.companyName) {
      let item = {
        companyName: {
          $like: postData.companyName
        }
      };
      likeCond.push(item);
    }
    if (postData.location) {
      let item = {
        state: {
          $like: postData.location
        }
      };
      likeCond.push(item);
    }
    if (postData.selectedJobType && postData.selectedJobType.length > 0) {
      let item = {
        jobType: {
          $in: postData.selectedJobType
        }
      };
      likeCond.push(item);
    }
    if (postData.selectedExp && postData.selectedExp.length > 0) {
      console.log(postData);
      let item = {
        experience: {
          $in: postData.selectedExp
        }
      };
      likeCond.push(item);
    }
    if (postData.selectedLocations && postData.selectedLocations.length > 0) {
      let item = {
        state: {
          $in: postData.selectedLocations
        }
      };
      likeCond.push(item);
    }
    if (postData.selectedCompanies && postData.selectedCompanies.length > 0) {
      let item = {
        companyName: {
          $in: postData.selectedCompanies
        }
      };
      likeCond.push(item);
    }
    if (likeCond.length > 0) {
      Object.assign(where, { $and: likeCond });
    }
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
            attributes: [
              "id",
              "category",
              "companyName",
              "minSalary",
              "maxSalary",
              "jobType",
              "city",
              "title",
              "state"
            ],
            where: where,
            limit: postData.limit,
            offset: postData.offset,
            order: [["createdAt", "DESC"]],
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
