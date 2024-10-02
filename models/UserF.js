const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    facebookid: String,   

});

module.exports = mongoose.model('UserF', userSchema);