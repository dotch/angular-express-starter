module.exports = function(app) {
  app.use('/auth', require('./auth'));
  app.use('/api/user', require('./api/user'));
};