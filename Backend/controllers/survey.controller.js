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