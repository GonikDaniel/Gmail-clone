var _ = require('lodash');
// var Category = require('./category');
// var User = require('./user');
var mails = [
  {"id":1 ,"userId": 13, "categoryId": 8, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, nisi.", "content" : "Always use dot syntax when using NgModel! Treat Scope as read-only in templates & write-only in controllers. The purpose of the scope is to refer to the model, not be the model. The model is your javascript objects. When doing bidirectional binding with ngModel make sure you don't bind directly to the scope properties. This will cause unexpected behavior in the child scopes."},
  {"id":2 ,"userId": 2, "categoryId": 3, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, enim.", "content": "Markers on a **DOM element**"},
  {"id":3 ,"userId": 1, "categoryId": 6, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, nemo!", "content": "There are 5 Recipes used to create a Service. One of those *was* unfortunately named, Service. So yes, amongst its fellow peers such as Provider Service and Factory Service, there is in fact a Service Service."},
  {"id":4 ,"userId": 2, "categoryId": 6, "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, in!", "content": "QUESTIONABLE CONTENT GOES HERE"},
  {"id":5 ,"userId": 4, "categoryId": 6, "description" : "Lorem ipsum dolor sit amet.", "content": "Service: Angular services are objects that are wired together using dependency injection (DI). You can use services to organize and share code across your app."},
  {"id":6 ,"userId": 5, "categoryId": 6, "description" : "Lorem ipsum dolor sit amet.", "content": "You can register a service to our Angular module `app` with a one of the following 5 recipes: \\n    - **factory**  \\n  - **provider**  \\n     - **service**  \\n  - **value**  \\n    - **constant** "}
];
var lastId = 6;

var buildMails = function() {
  // Make a deep copy so we don't change the main mails array
  var rawMails = JSON.parse(JSON.stringify(mails));
  var builtMails = [];
  var mail;

  for(var i=0, l=rawMails.length; i < l; i++) {
    mail = rawMails[i];
    // mail.user = User.get(mail.userId);
    // mail.category = Category.get(mail.categoryId);
    builtMails.push(mail);
  }
  return builtMails;
};

module.exports = {
  get: function(id) {
    return _.find(buildMails(), function(mail){
      return mail.id === id;
    });
  },
  all: function() {
    return buildMails();
  },
  update: function(mail) {
    var updatedMail;
    for(var i=0, l=mails.length; i < l; i++) {
      if(mails[i].id === mail.id){
        _.assign(mails[i], mail);
        updatedMail = mails[i];
        break;
      }
    }
    return updatedMail;
  },
  delete: function(id) {
    var deletedMail;
    for(var i=0, l=mails.length; i < l; i++) {
      if(mails[i].id === id){
        deletedMail = mails[i];
        mails.splice(i, 1);
        break;
      }
    }
    return deletedMail;
  },
  create: function(mail) {
    lastId += 1;
    mail.id = lastId;
    mails.push(mail);
    return mail;
  }
};