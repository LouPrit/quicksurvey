const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/survey.controller');

/**
 * Extract token from header and return forbidden if header is undefined.
 */
const checkToken = (req, res, next) => {
    const header = req.headers['authorization']; //Assign the authorization request header to 'header' (This is a string in the format of 'Bearer tokenhere')

    if(typeof header !== 'undefined') { //If header isn't undefined
        const bearer = header.split(' '); //Split header into an array from string so we end up with ['bearer', 'token']
        const token = bearer[1]; //Assign token from bearer to variable 'token'

        req.token = token; //Assign our extracted token to req.token
        next(); //Invoke the next piece of middleware
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}


/**
 * Handles POST requests to /survey/create/ for survey creation - PROTECTED ROUTE
 */
router.post("/create/", checkToken, surveyController.createSurvey);

/**
 * Handles GET requests to /survey/ for retreiving all surveys
 */
router.get("/", surveyController.getAllSurveys);

/**
 * Handles GET requests to /survey/USERNAME for survey retrieval - PROTECTED ROUTE
 */
router.get("/:user", checkToken, surveyController.getSurveys);

/**
 * Handles GET requests to /survey/USERNAME/ID for specific survey retrieval
 */
router.get("/:user/:id", surveyController.getSpecificSurvey);

/** 
 * Handles DELETE requests to /survey/delete/ID for deleting specific surveys
 */
router.delete("/delete/:id", checkToken, surveyController.deleteSurvey);



module.exports = router;