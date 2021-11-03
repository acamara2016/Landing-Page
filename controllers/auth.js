const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('login', {
      path: '/login',
      pageTitle: 'Login',
      error: message
    });
  };
  
  exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('register', {
      path: '/signup',
      pageTitle: 'Signup',
      error: message
    });
  };
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          req.flash('error', 'Invalid email or password.');
          return res.redirect('/login');
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
                res.redirect('/dashboard');
              });
            }
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch(err => console.log(err));
  };
  exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
      .then(userDoc => {
        if (userDoc) {
          req.flash('error', 'E-Mail exists already, please pick a different one.');
          return res.redirect('/signup');
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              fullname: fullname,
              email: email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then(result => {
            res.redirect('/login');
            return transport.sendMail({
              to: email,
              from: 'camara.visualstudio@protonmail.com',
              subject: 'Signup Successful',
              html: '<h1>You successfully signed up!</h1>'
            });
          })
          .catch(err=>{
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };