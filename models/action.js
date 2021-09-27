const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actionsSchema = new Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    dueDate: {
        type: Date,
        default: Date.now()
    },
    assignedBy: String,
    assignedTo: String,
    stateId: String,
});

module.exports = mongoose.model('Actions', actionsSchema);
