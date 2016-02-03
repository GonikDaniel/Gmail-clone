var _ = require('lodash');
var Mail = require('../models/mail');

module.exports = function(app) {
  app.get('/mail', function(req, res) {
    // res.json(Mail.all(req.query.box_like));
    res.json(Mail.all());
  });

  app.post('/mail', function(req, res) {
    // Add a delay here to simulate the delay of a live server
    // So things like button isSubmitting states can be demonstrated
    setTimeout(function(){
      res.json(Mail.create(req.body));
    }, 1000);
  });

  app.put('/mail/:id', function(req, res) {
    // Add a delay here to simulate the delay of a live server
    // So things like button isSubmitting states can be demonstrated
    setTimeout(function(){
      res.json(Mail.update(req.body));
    },1000);
  });

  app.get('/mail/:id', function(req, res) {
    var mailId = parseInt(req.param('id'), 10);
    res.json(Mail.get(mailId) || {});
  });

  app.delete('/mail/:id', function(req, res) {
    res.json(Mail.delete(parseInt(req.param('id'), 10)) || {});
  });
};
