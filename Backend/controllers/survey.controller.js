const surveyModel = require('../models/survey.model');
const jwt = require('jsonwebtoken');

const secret = "Secrets" //Used in signing of the JWT - In a live environment this should ALWAYS be stored in an environmental variable for security

/**
 * Method to create a new survey
 */
exports.createSurvey = (req, res, next) => {

    jwt.verify(req.token, secret, (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log(err);
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can create survey 
            const survey = new surveyModel(req.body);
            survey.save().then(reply => {
                res.status(200).send(reply)
            })
                .catch(error => next(error));
            console.log('SUCCESS: Survey saved');
        }
    })
}

/**
 * Method to fetch surveys for all users
 */
exports.getAllSurveys = (req, res, next) => {
    surveyModel.find({}, function (err, surveys) {
        if (err) return next(err);
        res.status(200).send(surveys); //surveys will either contain a list of surveys if they were found, or will send an empty array.
    });
    console.log('SUCCESS: Surveys retrieved');
}

/**
 * Method to fetch surveys for a specific user
 */
exports.getSurveys = (req, res, next) => {
    jwt.verify(req.token, secret, (err, authorizedData) => {
        if (err) {
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

/**
 * Method to fetch specific survey for a specific user
 */
exports.getSpecificSurvey = (req, res, next) => {
    surveyModel.find({ username: req.params.user, id: req.params.id }, function (err, survey) {
        if (err) return next(err);
        res.status(200).send(survey); //surveys will either contain a list of surveys if they were found, or will send an empty array.
    });
    console.log('SUCCESS: Survey retrieved');
}

/**
* Method to delete specific survey
*/
exports.deleteSurvey = (req, res, next) => {
    const survID = req.params.id;
    jwt.verify(req.token, secret, (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log(err);
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can delete survey
            surveyModel.deleteOne({ id: survID }, function (err, reply) {
                if (err) return next(err);
                res.status(200).send(reply);
            });
            console.log(`SUCCESS: Survey deleted with ID ${survID}`);
        }
    })
};