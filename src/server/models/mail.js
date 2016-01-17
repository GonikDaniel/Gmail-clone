var _ = require('lodash');
var db = require('../../../db.json');
// var Category = require('./category');
// var User = require('./user');
var mails = db.mail;
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