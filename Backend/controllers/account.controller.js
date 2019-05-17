const accountModel = require('../models/account.model');

/**
 * Method to create a new user account
 */
exports.createAccount = (req, res, next) => {
    const myAccount = new accountModel(req.body); //Create a new 'Notes' object (our model) from the data sent to us
    console.log(myAccount);
    myAccount.save()
        .then(reply => res.status(200).send(reply))
        .catch(error => next(error));
}

/**
 * Method to authenticate a user.
 */
exports.authenticateUser = (req, res, next) => {
    const username = (req.params.user).trim(); //gets the value of URL parameter called 'user' and then trims any leading/trailing spaces.
    const pass = (req.params.pass).trim();
    //Find the account that matches username provided
    accountModel.findOne({ username: username }, function (err, user) {
        if (err) throw err;
        let userDisabled = user.disabled;
        // compares password provided with password assosiated with user that was found
        user.comparePassword(pass, function (err, isMatch) {
            if (err) throw err;
            //Executed if passwords match.
            if (isMatch) {
                //If login attempts are 3 or above and account is not currently disabled, set disabled to true and return the new updated user object to client ({new: true})
                if (user.loginAttempts >= 3 && !userDisabled) {
                    console.log("Locked");
                    accountModel.findOneAndUpdate({ username: username }, { $set: { disabled: true } }, {new: true}, function (err, data) {
                        if (err) throw err;
                        res.status(200).json(data);
                    });
                    return 0; //Forces the function to stop executing.
                }
                //If user has some failed login attempts but not enough to lock the account, set the attempts to 0 before returning user account object.
                if (user.loginAttempts > 0 && !userDisabled) {
                    accountModel.findOneAndUpdate({ username: username }, { $set: { loginAttempts: 0 } }, {new: true}, function (err, data) {
                        if (err) throw err;
                        res.status(200).json(data);
                    });
                } else { //Passwords match and failed login attempts are 0 or account is disabled so just send user account object.
                    res.status(200).json(user);
                }
                //If password provided doesn't match password in user account increase loginAttempts by 1 and return result of 'comparePassword' call.
            } else {
                accountModel.findOneAndUpdate({ username: username }, { $inc: { loginAttempts: 1 } }, function (err, data) {
                    if (err) throw err;
                    res.statusMessage = "Incorrect password";
                    res.status(200).send(isMatch); 
                });
            }
        });
    });
};