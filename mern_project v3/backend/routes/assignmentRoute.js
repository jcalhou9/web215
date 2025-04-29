const express = require('express');
const {
    getAssignments,
    createAssignment,
    deleteAssignment,
    updateAssignment
} = require('../controllers/assignmentController');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

//require authentication for routes
router.use(requireAuth);

//routes
router.get('/', getAssignments);
router.post('/', createAssignment);
router.delete('/:id', deleteAssignment);
router.patch('/:id', updateAssignment);

module.exports = router;