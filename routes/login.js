const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

/**
 * /login/
 * POST
 * body : { username, email, password }
 * username OR email required
*/
router.post('/', authController.postLogin)
router.get('/', authController.getLogin)
 

module.exports = router
