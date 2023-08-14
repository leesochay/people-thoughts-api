// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
    username:{type:String, unique:true, required:true, trim:true},
    // email validation using match and regular expression
    email:{type:String, required:true, unique:true, trim:true,
        match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']},
    thoughts:[{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },],
    friends:[{
        type: Schema.Types.ObjectId,
        ref: "User",
    },],
  });

  const User = model('user', userSchema);

  module.exports = User