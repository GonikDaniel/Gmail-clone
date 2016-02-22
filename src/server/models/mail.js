var _ = require('lodash');
var db = require('../../../db.express.json');
var db2 = require('../../../db.json');
// var Category = require('./category');
// var User = require('./user');
var mails = db.mail;
var lastId = 1;

module.exports = {
  get: function(id) {
    return _.find(db2.mail, function(mail){
      var realId = (id > 1000) ? (id - 1000) : id;
      return mail.id === realId;
    });
  },
  all: function() {
    return mails;
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