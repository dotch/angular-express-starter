var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var async = require('async');
var nodemailer = require('nodemailer');

var config = require('../../config')
var auth = require('../auth.service');
var User = require('../../api/user/user.model');

/*
* Log in with Email.
* */
router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Wrong email and/or password' });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }
      res.send({ token: auth.createJWT(user) });
    });
  });
});

/*
* Create Email and Password Account.
* */
router.post('/signup', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }
    var user = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password,
      providers: ['local']
    });
    user.save(function() {
      res.send({ token: auth.createJWT(user) });
    });
  });
});

/*
* POST /forgot
* Create a random token and send it to the provided email adress.
* */
router.post('/forgot', function(req, res, next) {
  async.waterfall([
    // create random token
    function(done) {
      crypto.randomBytes(16, function(err, buffer) {
        var token = buffer.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      // lookup user by email
      User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (!existingUser) {
          return res.status(400).send({ message: 'No account with that email address exists.'});
        }
        // check provider
        if (existingUser.providers.indexOf('local') === -1) {
          return res.status(400).send({ message: 'This account has no password. Use ' + existingUser.providers[0] + ' to sign in'});
        }
        // add reset token
        existingUser.resetPasswordToken = token;
        existingUser.resetPasswordTokenExpiration = Date.now() + 3600000; // 1 hour
        existingUser.save(function(err) {
          done(err, token, existingUser);
        })
      })
    },
    // send reset token via email
    function(token, user, done) {
      var transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: config.sendgrid.user,
          pass: config.sendgrid.password
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'password-reset@angular-express-starter.com',
        subject: 'Reset your password',
        text: 'A password reset for your account has been requested.\n\n' +
          'Please click on the following link or paste it into your browser to reset your password.\n\n' +
          'http://' + req.headers.host + '/auth/reset/' + token + '\n\n' +
          'If you did not request a password reset, please ignore this email.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        if (!err) {
          res.send({ message: 'An email has been sent to the provided email address with further instructions'});
        }
        done(err);
      })
    }
  ], function(err) {
    if (err) return next(err);
  });
});

/*
* GET /reset/:token
* Verify password reset token and redirect to client side password reset page.
* */
router.get('/reset/:token', function(req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordTokenExpiration: {
      $gt: Date.now()
    }
  }, function(err, user) {
    if (!user) {
      return res.redirect('/#/password/reset/invalid');
    }
    res.redirect('/#/password/reset/' + req.params.token);
  })
});

/*
* POST /reset/:token
* Change the password.
* */
router.post('/reset/:token', function(req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordTokenExpiration: {
      $gt: Date.now()
    }
  }, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'Password reset token is invalid or has expired.'});
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiration = undefined;
    user.save(function(err) {
      if (err) {
        return res.status(400).send({ message: err});
      }
      res.send({ token: auth.createJWT(user) });
    })
  })
});

module.exports = router;