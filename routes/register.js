const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

const User = require('../models/User')
const authController = require('../controllers/auth')

/**
 * /register/
 * POST
 * body : { fname, lname, email, password, username }
*/
router.get('/', authController.getSignup)
router.post('/', authController.postSignup)


module.exports = router