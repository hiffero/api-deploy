const { body } = require('express-validator');
const express = require('express');
const { predictSalary } = require('../controllers/salaryController');

const router = express.Router();

router.post(
    '/predict',
    [
        body('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
        body('workExperience').isInt({ min: 0 }).withMessage('Work experience must be a positive number'),
        body('educationLevel').isIn(['bachelor', 'master', 'doctorate']).withMessage('Invalid education level'),
        body('jobTitle').notEmpty().withMessage('Job title is required'),
    ],
    predictSalary
);

// Ekspor router agar dapat digunakan di app.js
module.exports = router;
