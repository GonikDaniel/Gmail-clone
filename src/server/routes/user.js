var _ = require('lodash');
var User = require('../models/user');

module.exports = function(app) {
  app.get('/users', function(req, res) {
    var token = req.headers['x-token'] || '';
    res.json(User.getUserByToken(token));
    if (!token) { res.status(500).json({ error: 'message' }); }
  });

  app.post('/users', function(req, res) {
    var credentials = req.body;
    var token = '';
    
    if (User.checkUser(req.body)) {
      token = User.createToken(credentials);
    }
    setTimeout(function(){
      res.send(token);
    }, 1000);
  });

  app.put('/users/:id', function(req, res) {
    // Add a delay here to simulate the delay of a live server
    // So things like button isSubmitting states can be demonstrated
    setTimeout(function(){
      res.json(User.update(req.body));
    }, 1000);
  });

  app.get('/users/:id', function(req, res) {
    var userId = parseInt(req.param('id'), 10);
    res.json(User.get(userId) || {});
  });

  app.delete('/users/:id', function(req, res) {
    res.json(User.delete(parseInt(req.param('id'), 10)) || {});
  });
};
