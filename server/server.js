var path = require('path');
var async = require('async');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var config = require('./config');
var auth = require('./auth/auth.service');
var User = require('./api/user/user.model');

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

app.use(express.static(path.join(__dirname, '../client')));
require('./routes')(app);

app.listen(app.get('port'), app.get('ip'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
