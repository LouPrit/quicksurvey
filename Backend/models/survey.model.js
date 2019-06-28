const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Everything in Mongoose starts with a Schema. 
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const surveySchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    id: { type: Number, required: true },
    questions: [{
        id: Number,
        quesType: String,
        question: String,
        options: String
    }]
});


/**
 * Convert our notesSchema into a Model we can use and exports it (Creates a collection in the 'Master' database called 'surveys').
 * Models are fancy constructors compiled from Schema definitions and are responsible for creating and reading documents from the underlying MongoDB database.
 */
module.exports = mongoose.model('survey', surveySchema, 'surveys');