var multer = require("multer");
var utils = require("./../utils");
var models = require("../models");
var fs = require("fs");
govtjobsFiles = multer({ storage: utils.assestDest("govtjobs_files") }).single(
  "notificationFile"
);

exports.Upload = function (request, response) {
  govtjobsFiles(request, response, function (err) {
    let json_data = {};
    json_data.success = false;
    if (request.file) {
      json_data["success"] = true;
      json_data["data"] = "govtjobs_files/" + request.file.filename;
    } else {
      json_data.message = err;
    }
    response.json(json_data);
  });
};
// deleting the lockers attchments
exports.RemoveFile = (req, res) => {
  result = {};
  if (req.headers["file"] != undefined) {
    fs.unlink("uploads/" + req.headers["file"], err => {
      if (!err) {
        result.success = true;
        result.message = "Deleted Successfully";
      } else {
        result.success = false;
        result.message = err.message;
      }
      return res.json(result);
    });
  } else {
    result.success = false;
    result.message = "Problem with your request";
    return res.json(result);
  }
};
exports.postGovtJob = function (request, response) {
  let postData = request.body;
  models.govtjobs.create(postData).then(job => {
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
exports.getGovtJobsByStates = function (req, res) {
  models.states.hasMany(models.govtjobs, { foreignKey: "stateId" });
  models.states
    .findAll({
      include: [
        {
          model: models.govtjobs,
          order: [["createdAt", "DESC"]],
        }
      ]
    })
    .then(govtJobs => {
      let result = {};
      if (govtJobs) {
        result.success = true;
        result.data = govtJobs;
      } else {
        result.success = false;
        result.message = "No jobs Found";
      }
      res.json(result);
    });
};
exports.getGovtJobsByIndustries = function (req, res) {
  models.industries.hasMany(models.govtjobs, { foreignKey: "industryId" });
  models.industries
    .findAll({
      include: [
        {
          model: models.govtjobs,
          order: [["createdAt", "DESC"]],
        }
      ]
    })
    .then(govtJobs => {
      let result = {};
      if (govtJobs) {
        result.success = true;
        result.data = govtJobs;
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
