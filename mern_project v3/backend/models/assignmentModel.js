const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Complete'],
        default: 'Not Started'
    },
    dueDate: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Assignment', assignmentSchema);