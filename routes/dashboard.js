const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard')
const authController = require('../controllers/auth')
const isAuth = require('../middlewares/isAuth')
router.get('/dashboard',isAuth, dashboardController.getDashboard)
router.get('/links',isAuth, dashboardController.getLinks)
router.post('/logout', authController.postLogout)
 
module.exports = router;