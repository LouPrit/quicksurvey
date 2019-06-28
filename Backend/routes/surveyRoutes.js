const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/survey.controller');

/**
 * Handles POST requests to /survey/ for survey creation
 */
router.post("/", surveyController.createSurvey);

/**
 * Handles GET requests to /account/USERNAME/PASSWORD - This is for user authentication
 */
// router.get("/:user/:pass", accountController.authenticateUser);

module.exports = router;