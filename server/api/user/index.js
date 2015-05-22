var express = require('express');
var router = express.Router();

var auth = require('../../auth/auth.service');
var User = require('./user.model');

function validationError(res, err) {
  res.status(422).json(err);
}

/*
* Return a user's own profile
* */
router.get('/me', auth.ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

/*
* Change profile fields (including password)
* */
router.put('/me', auth.ensureAuthenticated, function(req, res) {
  var oldPass = req.body.oldPassword ? String(req.body.oldPassword) : null;
  var newPass = req.body.newPassword ? String(req.body.newPassword) : null;
  User.findById(req.user, '+password', function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    if (newPass) {
      user.password = newPass;
    }
    // Users with local authentication require password.
    if (user.providers.indexOf('local') !== -1) {
      user.comparePassword(oldPass, function(err, isMatch) {
        console.log(arguments);
        if (!isMatch) {
          return res.status(401).send({ message: 'Wrong password' });
        }
        user.save(function(err) {
          if (err) {
            validationError(res, err);
          }
          res.status(200).end();
        });
      });
    } else {
      if (newPass) {
        user.providers.push('local');
      }
      user.save(function(err) {
        if (err) {
          validationError(res, err);
        }
        res.status(200).end();
      });
    }
  });
});

module.exports = router;