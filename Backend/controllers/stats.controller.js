const statsModel = require('../models/stats.model');
const jwt = require('jsonwebtoken');

const secret = "Secrets" //Used in signing of the JWT - In a live environment this should ALWAYS be stored in an environmental variable for security

/**
 * Method to update stats when a user submits a completed survey
 */
exports.updateStats = (req, res, next) => {

    statsModel.find({ id: req.body.id }, function (err, stats) { //Finds our stats object and returns it inside an array
        if (err) return next(err);

        if (stats.length < 1) { //'find' returns an array so check if the array is empty here
            res.status(404).send(`Failed, no stats found with id '${req.body.id}' - unable to update`);
            return next();
        } else { //If our stats object was found
            console.log(`Successfully found stats with id '${req.body.id}'`)
            let statsOnDB = JSON.parse(JSON.stringify(stats[0])); //This is the stats object held on our database
            const updateInfo = JSON.parse(JSON.stringify(req.body)); //These are the answers sent from the front-end survey

            //Updates our stats object from database with the answers provided from front-end
            updateInfo.answers.map(x => {
                let currentQuestion = x.name.toString();
                statsOnDB[currentQuestion][x.value] = statsOnDB[currentQuestion][x.value] + 1;
            });

            const newStats = new statsModel(statsOnDB);

            stats[0].updateOne(newStats)
                .then(reply => {
                    console.log(`Stats with id '${req.body.id}' updated OK`);
                    res.status(200).send(reply)
                })
                .catch(error => next(error));
        }
    });

}

/**
 * Method to get stats for specific survey
 */
exports.getStats = (req, res, next) => {
    jwt.verify(req.token, secret, (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log(err);
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can get stats
            statsModel.find({ id: req.params.id }, function (err, stats) {
                if (err) return next(err);
                res.status(200).send(stats); //surveys will either contain a list of surveys if they were found, or will send an empty array.
            });
            console.log(`SUCCESS: Stats retrieved for id: ${req.params.id}`);
        }
    })

}