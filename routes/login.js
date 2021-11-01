const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

/**
 * /login/
 * POST
 * body : { username, email, password }
 * username OR email required
*/
router.post('/', (req, res, next) => {
	// Get the username, email and password from req.body
	const { email, password } = req.body

	if ((email == undefined || email == '') && (password == undefined || password == '')) {
		res.status(401).json({
			'msg': 'Authentication failed'
		}).end()
	} else {
		User.findOne({ email: email })
		.exec()
		.then(data => {
			if ( data === null ) {
				res.status(401).json({
					'msg': 'Authentication failed'
				}).end()
			}

			// Compare the password
			bcrypt.compare(password, data.password, (err, result) => {
				console.log(result)
				if (result) {
					// Data to be provided with token					
					const payLoad = {
						'email': data.email,
						'fullname': data.fullname
					}
					// Options for the token
					const jwtOptions = {
						expiresIn: '1h'
					}

					// Generate the token
					const token = jwt.sign(payLoad, 'YOUR_JWT_KEY', jwtOptions)

					// Send the token
					res.status(200).json({
						'msg': 'Authentication successful',
						'auth_token': token
					})
					req.session.isLoggedIn = true;
					req.session.user = user;
					return req.session.save(err => {
					console.log(err);
					res.redirect('/dashboard');
					});
				} else {
					res.status(401).json({
						'msg': 'Authentication failed'
					}).end()
				}
			})			
		})
		.catch(e => {
			console.log(e)
		})
	}
})

router.get('/', (req, res, next)=>{
	res.render('login', {
		pageTitle: 'Login', 
		path:'login'
	})
})

module.exports = router
