(function() {
    'use strict';

    angular
        .module('dgGmail.contacts')
        .factory('contacts', contacts);

    contacts.$inject = ['$http', 'Restangular'];

    /* @ngInject */
    function contacts($http, Restangular) {
        var service = {
            getAll: getContactsList,
            getDetail: getContactDetail
        };
        return service;

        ////////////////

        function getContactsList() {
            return Restangular.all('contact').getList();
        }

        function getContactDetail(id) {
            return Restangular.one('contact', id).get();
        }
    }
})();