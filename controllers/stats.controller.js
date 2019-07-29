const statsModel = require('../models/stats.model');
const ipModel = require('../models/ip.model');
const jwt = require('jsonwebtoken');

const secret = "Secrets" //Used in signing of the JWT - In a live environment this should ALWAYS be stored in an environmental variable for security

/**
 * Method to update stats when a user submits a completed survey
 */
exports.updateStats = (req, res, next) => {

    /**
     * Check to see if our clients IP address / survey ID are already in the database,
     * if they are - it means they have already completed this survey
     * so we should send them an error message.
     */
    ipModel.find({ id: req.body.id, ip: req.ip }, function (err, ip) { 
        if (err) return next(err);

        if (ip.length < 1) { //If no IP was found our user hasn't previously completed this survey so continue to update stats
            statsModel.find({ id: req.body.id }, function (err, stats) { //Finds our stats object and returns it inside an array
                if (err) return next(err);

                if (stats.length < 1) { //'find' returns an array so check if the array is empty here
                    res.status(404).send(`Failed, no stats found with id '${req.body.id}' - unable to update`);
                    return next();
                } else { //If our stats object was found
                    console.log(`Successfully found stats with id '${req.body.id}'`);
                    let statsOnDB = JSON.parse(JSON.stringify(stats[0])); //This is the stats object held on our database
                    const updateInfo = JSON.parse(JSON.stringify(req.body)); //These are the answers sent from the front-end survey

                    //Updates our stats object from database with the answers provided from front-end
                    updateInfo.answers.map(x => {
                        let currentQuestion = x.name.toString();
                        statsOnDB[currentQuestion][x.value] = statsOnDB[currentQuestion][x.value] + 1;
                    });

                    const newStats = new statsModel(statsOnDB); //Create a new stats object using the information sent from client


                    //This is where we update the stats Object we found with our newly created stats object containing updated values.
                    stats[0].updateOne(newStats)
                        .then(reply => {
                            /**
                             * If we successfully update the stats we then add the surveys ID along with the clients IP to the database,
                             * this allows us to check for these values in the future to determine if the IP has already completed this survey.
                             */
                            const ipUpdate = new ipModel({ id: req.body.id, ip: req.ip });
                            ipUpdate.save()
                                .then(reply => {
                                    console.log(`Stats with id '${req.body.id}' updated OK`);
                                    console.log(`Added entry into IP table '${req.body.id}' / '${req.ip}'`);
                                    res.status(200).send(reply)
                                })
                                .catch(error => next(error))

                        })
                        .catch(error => next(error));
                }
            });
        } else {
            res.status(200).json({completed: true});
            console.log(`Survey ${req.body.id} has already been completed by IP ${req.ip}`);
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