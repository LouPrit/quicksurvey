const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');

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
 * Handles PATCH requests to /update/ for updating survey stats
 */
router.patch("/", statsController.updateStats);


/**
 * Handles GET requests to /update/ID for stats retreival - PROTECTED ROUTE
 */
router.get("/:id", checkToken, statsController.getStats);


module.exports = router;