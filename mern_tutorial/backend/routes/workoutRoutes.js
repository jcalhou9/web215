const express = require('express');
const {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require authentication for all routes
router.use(requireAuth);

// GET all workouts
router.get('/', getAllWorkouts);

// GET a single workout
router.get('/:id', getSingleWorkout);

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);


module.exports = router;