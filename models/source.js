const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sourceSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Source', sourceSchema);
