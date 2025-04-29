require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const assignmentRoutes = require('./routes/assignmentRoute.js');
const pingRoutes = require('./routes/pingRoute.js');

const app = express();

const cors = require('cors');

//allowed frontend origins
const allowedOrigins = [
    'http://localhost:3000',
    'https://https://assignmentmanager-8mn3.onrender.com'
];

//middleware
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`Blocked by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/ping', pingRoutes);

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });