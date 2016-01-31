(function() {
    'use strict';

    angular.module('dgGmail.contacts').controller('ContactsController', ContactsController);

    ContactsController.$inject = ['contacts', '$state', '$stateParams'];

    /* @ngInject */
    function ContactsController(contacts, $state, $stateParams) {
        var vm = this;
        vm.title = 'ContactsController';

        activate();

        ////////////////

        function activate() {
            if ($stateParams.id) {
                contacts.getDetail($stateParams.id).then(function(details) {
                    vm.person = details;
                }, function(error) {
                    console.log(error);
                });
            } else {
                contacts.getAll().then(function(contacts) {
                    vm.contacts = contacts;    
                }, function(error) {
                    console.log(error);
                });
            }
        }

        vm.toggleSearch = function() {
            vm.showSearch = !vm.showSearch;
            
            if (!vm.showSearch) {        
                $('.c-search').closest('.row').slideUp(100);
            } else {   
                $('.c-search').closest('.row').slideDown(100);
            }
        };

        vm.showDetails = function(contactId) {
            contacts.getDetail(contactId).then(function(details) {
                vm.person = details;
                $state.go('contacts.detail', { id: contactId });
            }, function(error) {
                console.log(error);
            });
        };
    }
})();