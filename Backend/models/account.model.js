const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


/**
 * Connection settings
 */
const server = 'localhost:27017';
const database = 'accounts';


/**
 * Create connection to Database
 */
console.log(`Attempting to connect to the database...`);
mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
    .then(() => console.log("Connected to database"))
    .catch(error => {
        console.log(`Couldn't connect to the database: \n${error}`);
        process.exit();
    });
    mongoose.set('useCreateIndex', true); //For the Schema to keep our username unique (index: { unique: true })
    mongoose.set('useFindAndModify', false);

/**
 * Everything in Mongoose starts with a Schema. 
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const accountSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    loginAttempts: { type: Number, required: true, default: 0 },
    disabled: {type: Boolean, required: true, default: false}
});

/**
 * Hashes our password using bcrypt
 * This middleware is automatically ran whenever doc.save() is used (Called from the controller files)
 */
accountSchema.pre('save', function(next) { //Registers this middleware for the doc.save() function
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next(); //Will make sure the rest of this middleware doesn't run
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next(); //Executes the next middleware
        });
    });
});

/**
 * Uses bcrypt to compare password provided to this function with the password in the user object this function was called against.
 * If the passwords match returns true, otherwise returns false.
 */
accountSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/**
 * Convert our notesSchema into a Model we can use and exports it.
 * Models are fancy constructors compiled from Schema definitions and are responsible for creating and reading documents from the underlying MongoDB database.
 */
module.exports = mongoose.model('Account', accountSchema);