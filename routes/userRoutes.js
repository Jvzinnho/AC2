const express = require('express');
const userController = require('../controllers/usersController'); 
const router = express.Router();

router.get('/:email', userController.getUserByEmail);
router.post('/new', userController.createUser);

module.exports = router;
