var _ = require('lodash');
var crypto = require('crypto');
var db = require('../../../db.json');
var users = db.user;
var lastId = 1;

module.exports = {
  checkUser: function(credentials) {
    return _.find(users, function(user) {
      return (credentials.email === user.email) && 
             (credentials.password === user.password);
    });
  },
  createToken: function(credentials) {
    var cipher = crypto.createCipher('aes192', 'a password');
    var encrypted = cipher.update(credentials.email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },
  getUserByToken: function(token) {
    var decipher = crypto.createDecipher('aes192', 'a password');

    var encrypted = token;
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    var user = _.find(users, function(user) {
      return (decrypted === user.email);
    }); 

    return user ? [user] : [];
  },
  get: function(id) {
    return _.find(users, function(user){
      return user.id === id;
    });
  },
  all: function() {
    return users;
  },
  update: function(user) {
    var updatedUser;
    for(var i=0, l=users.length; i < l; i++) {
      if(users[i].id === user.id){
        _.assign(users[i], user);
        updatedUser = users[i];
        break;
      }
    }
    return updatedUser;
  },
  delete: function(id) {
    var deletedUser;
    for(var i=0, l=users.length; i < l; i++) {
      if(users[i].id === id){
        deletedUser = users[i];
        users.splice(i, 1);
        break;
      }
    }
    return deletedUser;
  },
  create: function(user) {
  }
};