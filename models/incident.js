const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = new Schema({
    title: String,
    description: String,
    categoryId: String,
    locationId: String,
    createdAt: String,
    createdBy: String,
    stateId: String,
});

module.exports = mongoose.model('Incident', incidentSchema);
