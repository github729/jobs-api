var models = require("../models");

exports.postResume = function(req, res) {
  let postData = req.body;
  let result = {};
  models.resumes
    .create(postData)
    .then(resume => {
      postData.workHistory.map(workHistory => {
        workHistory.resumeId = resume.id;
      });
      postData.educationDetails.map(education => {
        education.resumeId = resume.id;
      });
      postData.languageProficiency.map(language => {
        language.resumeId = resume.id;
      });
      if (resume) {
        if (postData.workHistory != undefined) {
          models.workhistories
            .bulkCreate(postData.workHistory)
            .then(function(work) {
              if (work) {
                models.education
                  .bulkCreate(postData.educationDetails)
                  .then(function(education) {
                    if (education) {
                      models.languages
                        .bulkCreate(postData.languageProficiency)
                        .then(function(language) {
                          if (language) {
                            if (language) {
                              result.success = true;
                              result.message = "Resume Posted Successfully";
                            } else {
                              result.success = true;
                              result.message = "Resume Not Posted Successfully";
                            }
                            res.json(result);
                          }
                        })
                        .catch(function(err) {
                          result.success = false;
                          result.message = err.message;
                          return res.json(result);
                        });
                    }
                  })
                  .catch(function(err) {
                    result.success = false;
                    result.message = err.message;
                    return res.json(result);
                  });
              }
            })
            .catch(function(err) {
              result.success = false;
              result.message = err.message;
              return res.json(result);
            });
        }
      }
    })
    .catch(function(err) {
      result.success = false;
      result.message = err.message;
      return res.json(result);
    });
};
exports.getResume = function(req, res) {
  models.resumes.belongsTo(models.users, { foreignKey: "userId" });
  models.resumes.hasMany(models.languages, { foreignKey: "resumeId" });
  models.resumes.hasMany(models.workhistories, { foreignKey: "resumeId" });
  models.resumes.hasMany(models.education, { foreignKey: "resumeId" });
  models.resumes
    .findOne({
      where: { userId: req.params.id },
      include: [
        {
          model: models.languages
        },
        {
          model: models.workhistories
        },
        {
          model: models.education
        },
        {
          model: models.users
        }
      ]
    })
    .then(resume => {
      let result = {};
      if (resume) {
        result.success = true;
        result.data = resume;
      } else {
        result.success = false;
        result.message = "No Resume Found";
      }
      res.json(result);   
    });
};
