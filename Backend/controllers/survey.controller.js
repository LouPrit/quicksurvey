const surveyModel = require('../models/survey.model');


/**
 * Method to create a new survey
 */
exports.createSurvey = (req, res, next) => {
    const survey = new surveyModel(req.body);

    survey.save().then(reply => {
        res.status(200).send(reply)})
    .catch(error => next(error));
}

/**
 * Method to fetch surveys for a specific user
 */
exports.getSurveys = (req, res, next) => {
    surveyModel.find({ username: req.params.user }, function (err, surveys) {
        if (err) return next(err);
            res.status(200).send(surveys); //surveys will either contain a list of surveys if they were found, or will send an empty array.
    });
}