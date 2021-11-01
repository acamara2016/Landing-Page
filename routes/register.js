const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

const User = require('../models/User')


/**
 * /register/
 * POST
 * body : { fname, lname, email, password, username }
*/
router.get('/', (req, res, next) => {
	res.render('register', {
		pageTitle: 'Register',
		path: 'register',
		error: ''
	})
})
router.post('/', (req, res, next) => {
	// Get values
	const { fullname, email, password } = req.body

	// REGEX for E-mail validation
	const reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/

	if ( fullname === '' || fullname == null) {
		res.status(422).render('register',{
			'error': 'Fullname required'
		})
	}else if ( email === '' || email == null || !reg.test(email) ) {
		// res.status(422).json({
		// 	'error': 'emailError'
		// }).end()
		res.status(422).render('register',{
			'error': 'Email error'
		}).end()
	} else if ( password.length < 6 || password == null ) {
		res.status(422).render('register',{
			'error': 'Password error'
		})
		// res.status(422).json({
		// 	'error': 'passwordError'
		// }).end()
	} else {
		User.findOne( { $or: [{ email: email }] })
		.exec()
		.then(data => {
			if (data) {
				res.status(422).render('register',{
					'error': 'Email already exist'
				})
				// res.status(422).json({
				// 	'error': 'usernameOrEmailExistsError'
				// }).end()
			} else {
				// If username or email is not used
				bcrypt.hash(password, 10, (err, password) => {
					if ( err ) {
						res.status(500).json({
							'msg': 'Error while encrypting data. Please try again later.'
						})
					} else {
						const user = new User({ fullname, email, password })
						user.save()
						.then(() => {
							// res.status(200).json({
							// 	'msg': 'Data entered successfuly.'
							// })
							res.status(200).redirect('/dashboard')
						})
						.catch(() => {
							res.status(500).render('register',{
								'error': 'Error while saving data to database. Please try again later.'
							})
							// res.status(500).json({
							// 	'msg': 'Error while saving data to database. Please try again later.'
							// }).end()
						})			
					}		
				})
			}
		})
		.catch(e => {
			console.log(e)
		})
	}

	
})

/**
 * /register/username
 * POST
 * body : { username }
*/
// router.post('/username', (req, res, next) => {
// 	const { username } = req.body
// 	User.findOne({ username: username }, (err, data) => {
// 		if (err) {
// 			res.status(500).json({
// 				'msg': 'Server error occured. Please try again later...'
// 			}).end()
// 		} else {
// 			if (data) {
// 				res.status(200).json({
// 					'msg': 'User with the username exists.',
// 					'exists': true
// 				}).end()
// 			} else {
// 				res.status(404).json({
// 					'msg': 'User with the username does not exist.',
// 					'exists': false
// 				}).end()
// 			}
// 		}
// 	})
// })

/**
 * /register/email
 * POST
 * body : { email }
*/
router.post('/email', (req, res, next) => {
	const { email } = req.body
	User.findOne({ email: email }, (err, data) => {
		if (err) {
			res.status(500).json({
				'msg': 'Server error occured. Please try again later...'
			}).end()
		} else {
			if (data) {
				res.status(200).json({
					'msg': 'User with the email exists.',
					'exists': true
				}).end()
			} else {
				res.status(404).json({
					'msg': 'User with the email does not exist.',
					'exists': false
				}).end()
			}
		}
	})
})

module.exports = router