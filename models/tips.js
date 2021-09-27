const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipsSchema = new Schema({
    region: String,
    site: String,
    emplacement: String,
    locationId: String,
    createdAt: String,
    createdBy: String,
    stateId: String,
});

module.exports = mongoose.model('Tips', tipsSchema);
