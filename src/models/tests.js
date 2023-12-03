const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Test = new Schema({
    title: String,
    description: String,
    date: String,
    image: String,

});

module.exports = mongoose.model('test', Test);