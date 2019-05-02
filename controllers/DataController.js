var models = require("../models");

exports.getCities = function(req, res) {
  models.cities
    .findAll({
      where: { state_id: req.params.stateId }
    })
    .then(data => {
      let result = {};
      if (data) {
        result.data = data;
        result.success = true;
      } else {
        result.success = false;
        result.message = "No Locations Found";
      }
      res.json(result);
    });
};

exports.getStates = function(req, res) {
  models.states.findAll({}).then(data => {
    let result = {};
    if (data) {
      result.data = data;
      result.success = true;
    } else {
      result.success = false;
      result.message = "No States Found";
    }
    res.json(result);
  });
};