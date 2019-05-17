const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

/**
 * Handles POST requests to /account/
 */
router.post("/", accountController.createAccount);

/**
 * Handles GET requests to /account/USERNAME/PASSWORD - This is for user authentication
 */
router.get("/:user/:pass", accountController.authenticateUser);

module.exports = router;