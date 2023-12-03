const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    email: String,
    pass: String,
    username: String,

});

module.exports = mongoose.model('users', users);