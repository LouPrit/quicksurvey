const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Everything in Mongoose starts with a Schema. 
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const ipSchema = new Schema({ id: { type: Number, required: true }, ip: { type: String, required: true } });


/**
 * Convert our notesSchema into a Model we can use and exports it (Creates a collection in the 'Master' database called 'stats').
 * Models are fancy constructors compiled from Schema definitions and are responsible for creating and reading documents from the underlying MongoDB database.
 */
module.exports = mongoose.model('ip', ipSchema, 'ipp');