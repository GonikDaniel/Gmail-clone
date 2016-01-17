(function(){
    'use strict';

    angular.module('dgGmail').factory('mail', mail);

    function mail(Restangular) {

        function getAllMails() {
            return Restangular.all("mail").getList().$object;
        }

        function getMailById(id) {
            return Restangular.one("mail", id);
        }


        var factory = {
            getAll: getAllMails,
            getById: getMailById    
        };

        return factory;
    }
    
})();