const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    twitterid: String,   

});

module.exports = mongoose.model('UserT', userSchema);