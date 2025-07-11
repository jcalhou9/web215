const Workout = require('../models/workoutModels');
const mongoose = require('mongoose');


// GET all workouts
const getAllWorkouts = async (req, res) => {
    const user_id = req.user._id;
    try {
        const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// GET a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout not found' });
    }
    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    let emptyFields = [];
    if(!title) {
        emptyFields.push('title');
    }
    if(!load) {
        emptyFields.push('load');
    }
    if(!reps) { 
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }
    try {
        const user_id = req.user._id;
        const workout = await Workout.create( { title, load, reps, user_id } );
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout not found' });
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout not found' });
    }
    try {
        const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}; 