const express = require('express')
const router = express.Router()
const urlController = require('../controllers/url')
const isAuth = require('../middlewares/isAuth')
router.get('/:url', urlController.clickUrl)
router.get('/', urlController.getIndex)
router.post('/shorten', urlController.shortenUrl)
router.get('/success/:url', urlController.getSuccess)
router.get('/data', urlController.getData);
router.get('/about-us', urlController.getAbout)
module.exports = router;
