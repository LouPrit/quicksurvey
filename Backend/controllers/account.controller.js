const accountModel = require('../models/account.model');

/**
 * Method to create a new user account
 */
exports.createAccount = (req, res, next) => {
    const myAccount = new accountModel(req.body); //Create a new 'Account' object (our model) from the data sent to us
   
    accountModel.find({ $or: [{username: myAccount.username}, {email: myAccount.email}] }, function (err, user) { //Check to see if an account with provided username or email already exists
        if (err) return next(err);

        if (user.length !== 0 ) { //'find' returns an array so check to see if it contains data (Found matching accounts already registered)
            const userObj = { //Create a object to send to frontend with basic details of existing account
                exists: true,
                username: user[0].username,
                email: user[0].email
            };
            console.log(`User with username ${myAccount.username} or email ${myAccount.email} already exists`);
            res.status(200).json(userObj);
        } else {
            myAccount.save()
            .then(reply => {
                console.log(`Account with username: ${myAccount.username} and email: ${myAccount.email} successfully created`);
                res.status(200).send(reply)})
            .catch(error => next(error));
        }

    });
}

/**
 * Method to authenticate a user.
 */
exports.authenticateUser = (req, res, next) => {
    const username = (req.params.user).trim(); //gets the value of URL parameter called 'user' and then trims any leading/trailing spaces.
    const pass = (req.params.pass).trim();
    //Find the account that matches username provided
    accountModel.findOne({ username: username }, function (err, user) {
        if (err) return next(err);
        if (!user) { //If no user is returned from 'findOne' it returns a 'null', we handle that here.
        console.log(`No account found with username: ${username}`)
            res.status(400).send("No account found");
            return next();
        }
        let userDisabled = user.disabled;
        // compares password provided with password assosiated with user that was found
        user.comparePassword(pass, function (err, isMatch) {
            if (err) return next(err);
            //Executed if passwords match.
            if (isMatch) {
                //If login attempts are 3 or above and account is not currently disabled, set disabled to true and return the new updated user object to client ({new: true})
                if (user.loginAttempts >= 3 && !userDisabled) {
                    accountModel.findOneAndUpdate({ username: username }, { $set: { disabled: true } }, {new: true}, function (err, data) {
                        if (err) return next(err);
                        console.log(`User ${username} logged in but has 3 or more failed attempts, disabling account`);
                        res.status(200).json(data);
                    });
                    return 0; //Forces the function to stop executing.
                }
                //If user has some failed login attempts but not enough to lock the account, set the attempts to 0 before returning user account object.
                if (user.loginAttempts > 0 && !userDisabled) {
                    accountModel.findOneAndUpdate({ username: username }, { $set: { loginAttempts: 0 } }, {new: true}, function (err, data) {
                        if (err) return next(err);
                        console.log(`User ${username} found and passwords match`);
                        res.status(200).json(data);
                    });
                } else { //Passwords match and failed login attempts are 0 or account is disabled so just send user account object.
                    console.log(`User ${username} found and passwords match`);
                    res.status(200).json(user);
                }
                //If password provided doesn't match password in user account increase loginAttempts by 1 and return result of 'comparePassword' call.
            } else {
                accountModel.findOneAndUpdate({ username: username }, { $inc: { loginAttempts: 1 } }, function (err, data) {
                    if (err) return next(err);
                    console.log(`User ${username} found but password doesn't match`);
                    res.statusMessage = "Incorrect password";
                    res.status(200).send(isMatch); 
                });
            }
        });
    });
};