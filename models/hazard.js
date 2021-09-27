const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hazardsSchema = new Schema({
    title: String,
    description: String,
    locationId: String,
    createdAt: String,
    createdBy: String,
    stateId: String,
    sourceId: String,
});

module.exports = mongoose.model('Hazards', hazardsSchema);
