const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/survey.controller');

/**
 * Handles POST requests to /survey/ for survey creation
 */
router.post("/", surveyController.createSurvey);

/**
 * Handles GET requests to /survey/USERNAME for survey retrieval
 */
router.get("/:user", surveyController.getSurveys);

module.exports = router;