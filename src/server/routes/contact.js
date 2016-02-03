var _ = require('lodash');
var Contact = require('../models/contact');

module.exports = function(app) {
  app.get('/contact', function(req, res) {
    res.json(Contact.all());
  });

  app.post('/contact', function(req, res) {
    // Add a delay here to simulate the delay of a live server
    // So things like button isSubmitting states can be demonstrated
    setTimeout(function(){
      res.json(Contact.create(req.body));
    }, 1000);
  });

  app.put('/contact/:id', function(req, res) {
    // Add a delay here to simulate the delay of a live server
    // So things like button isSubmitting states can be demonstrated
    setTimeout(function(){
      res.json(Contact.update(req.body));
    }, 1000);
  });

  app.get('/contact/:id', function(req, res) {
    var contactId = parseInt(req.param('id'), 10);
    res.json(Contact.get(contactId) || {});
  });

  app.delete('/contact/:id', function(req, res) {
    res.json(Contact.delete(parseInt(req.param('id'), 10)) || {});
  });
};
