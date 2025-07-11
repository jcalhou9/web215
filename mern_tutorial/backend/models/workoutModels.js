const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the workout schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    user_id: {
        type:String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Workout', workoutSchema);
