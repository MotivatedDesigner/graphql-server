const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertsSchema = new Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: String,
    stateId: String,
});

module.exports = mongoose.model('Alerts', alertsSchema);
