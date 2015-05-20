var express = require('express');
var router = express.Router();

var auth = require('../auth.service');
var User = require('../../api/user/user.model');

/*
 |--------------------------------------------------------------------------
 | Unlink Provider
 |--------------------------------------------------------------------------
 */
router.get('/:provider', auth.ensureAuthenticated, function(req, res) {
  var provider = req.params.provider;
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user[provider] = undefined;
    user.providers.splice(user.providers.indexOf(provider), 1);
    if (user.providers.length === 0) {
      return res.status(403).send({ message: 'Can not remove last method of authentication'});
    }
    user.save(function() {
      res.status(200).end();
    });
  });
});

module.exports = router;