const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    githubid: String,   

});

module.exports = mongoose.model('UserG', userSchema);