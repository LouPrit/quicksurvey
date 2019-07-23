const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Everything in Mongoose starts with a Schema. 
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const statsSchema = new Schema({ id: { type: Number, required: true } }, { strict : false });


/**
 * Convert our notesSchema into a Model we can use and exports it (Creates a collection in the 'Master' database called 'stats').
 * Models are fancy constructors compiled from Schema definitions and are responsible for creating and reading documents from the underlying MongoDB database.
 */
module.exports = mongoose.model('stat', statsSchema, 'stats');