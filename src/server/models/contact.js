var _ = require('lodash');
var db = require('../../../db.json');
var contacts = db.contact;
var lastId = 1;

module.exports = {
  get: function(id) {
    return _.find(contacts, function(contact){
      return contact.id === id;
    });
  },
  all: function() {
    return contacts;
  },
  update: function(contact) {
    var updatedContact;
    for(var i=0, l=contacts.length; i < l; i++) {
      if(contacts[i].id === contact.id){
        _.assign(contacts[i], contact);
        updatedContact = contacts[i];
        break;
      }
    }
    return updatedContact;
  },
  delete: function(id) {
    var deletedContact;
    for(var i=0, l=contacts.length; i < l; i++) {
      if(contacts[i].id === id){
        deletedContact = contacts[i];
        contacts.splice(i, 1);
        break;
      }
    }
    return deletedContact;
  },
  create: function(contact) {
    lastId += 1;
    contact.id = lastId;
    contacts.push(contact);
    return contact;
  }
};