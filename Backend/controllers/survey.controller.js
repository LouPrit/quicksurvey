const surveyModel = require('../models/survey.model');
const jwt = require('jsonwebtoken');

const secret = "Secrets" //Used in signing of the JWT - In a live environment this should ALWAYS be stored in an environmental variable for security

/**
 * Method to create a new survey
 */
exports.createSurvey = (req, res, next) => {

    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log(err);
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can create survey 
            const survey = new surveyModel(req.body);
            survey.save().then(reply => {
                res.status(200).send(reply)})
            .catch(error => next(error));
            console.log('SUCCESS: Survey saved');
        }
    })
}

/**
 * Method to fetch surveys for a specific user
 */
exports.getSurveys = (req, res, next) => {
    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log(err);
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can get surveys
            surveyModel.find({ username: req.params.user }, function (err, surveys) {
                if (err) return next(err);
                    res.status(200).send(surveys); //surveys will either contain a list of surveys if they were found, or will send an empty array.
            });
            console.log('SUCCESS: Surveys retrieved');
        }
    })
};
