var express = require('express');
var router = express.Router();

var auth = require('../../auth/auth.service');
var User = require('./user.model');

router.get('/me', auth.ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

router.put('/me', auth.ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});

router.post('/me/password', auth.ensureAuthenticated, function(req, res) {
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  User.findById(req.user, '+password', function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.comparePassword(oldPass, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong old password' });
      }
      user.password = newPass;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  });
});

module.exports = router;