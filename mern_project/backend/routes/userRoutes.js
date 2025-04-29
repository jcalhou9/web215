const express = require('express');
const router = express.Router();
//controller functions
const { registerUser, loginUser } = require('../controllers/userController');


//login route
router.post('/login', loginUser);


//signup route
router.post('/register', registerUser);


module.exports = router;