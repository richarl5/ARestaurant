const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatternSchema = Schema({
    id : {type: Number, unique: true},
    restaurantID :[{type: String, unique: true}]
});

module.exports = mongoose.model('Pattern', PatternSchema);