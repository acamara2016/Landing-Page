const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const isAuth = require('../middlewares/isAuth')
/**
 * /login/
 * POST
 * body : { username, email, password }
 * username OR email required
*/
router.post('/', authController.postLogin)
router.get('/', isAuth, authController.getLogin)
 

module.exports = router
