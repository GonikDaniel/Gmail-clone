var _ = require('lodash');
var db = require('../../../db.express.json');
var db2 = require('../../../db.json');
// var Category = require('./category');
// var User = require('./user');
var mails = db.mail;
var lastId = 1;

var buildMails = function(rawData) {
  // Make a deep copy so we don't change the main mails array
  var data = rawData || mails;
  var rawMails = JSON.parse(JSON.stringify(data));
  var builtMails = [];
  var mail;

  for(var i=0, l=rawMails.length; i < l; i++) {
    mail = rawMails[i];
    builtMails.push(mail);
  }
  return builtMails;
};

module.exports = {
  get: function(id) {
    return _.find(db2.mail, function(mail){
      return mail.id === id;
    });
  },
  all: function(boxName) {
    mails = db.mail[boxName];
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