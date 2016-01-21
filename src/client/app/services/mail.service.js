(function(){
    'use strict';

    angular.module('dgGmail').factory('mail', mail);
    mail.$inject = ['Restangular'];

    function mail(Restangular) {
        var factory = {
            getAll: getAllMails,
            getById: getMailById    
        };

        return factory;

        ///////////////////

        function getAllMails() {
            return Restangular.all("mail").getList();
        }

        function getMailById(id) {
            return Restangular.one("mail", id);
        }

    }
    
})();