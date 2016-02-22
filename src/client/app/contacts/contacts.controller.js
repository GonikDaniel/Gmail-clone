(function() {
    'use strict';

    angular.module('dgGmail.contacts').controller('ContactsController', ContactsController);

    ContactsController.$inject = ['$scope','contacts', '$state', '$stateParams', 'ngDialog'];

    /* @ngInject */
    function ContactsController($scope, contacts, $state, $stateParams, ngDialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            if ($stateParams.id) {
                contacts.getDetail($stateParams.id).then(function(details) {
                    if(!details.id) {
                        $state.go('app.contacts.list');  //if we don't have this contact - redirect
                    }
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

        /**
         *
         * Search section
         *
         */
        
        vm.toggleSearch = function() {
            vm.showSearch = !vm.showSearch;
            
            if (!vm.showSearch) {        
                $('.c-search').closest('.row').slideUp(100);
            } else {   
                $('.c-search').closest('.row').slideDown(100);
            }
        };

        vm.search = function() {
            console.log(vm.searchInput);
        };


        /**
         *
         * Contact details section
         *
         */
        
        vm.showDetails = function(contactId) {
            contacts.getDetail(contactId).then(function(details) {
                vm.person = details;
                $state.go('app.contacts.detail', { id: contactId });
            }, function(error) {
                console.log(error);
            });
        };

        /**
         *
         * Contact edit/delete section
         *
         */
        
        vm.editContact = function(contact) {
            ngDialog.open({
                template: 'app/contacts/contact-edit.tpl.html',
                controller: 'ContactsController',
                controllerAs: 'contactsCtrl'
            });
        };

        vm.removeContact = function(contactId) {
            vm.person.remove().then(function(response) {
                console.log(response);
                toastr.success('Контакт был успешно удален', 'Удален', {timeOut: 2000, closeButton: true});
                $state.go('app.contacts.list');
                $state.reload();
            }, function(error) {
                console.log(error);
                toastr.error(response.error, 'Что-то пошло не так', {timeOut: 2000, closeButton: true});
            });
        };

        vm.saveContact = function() {
            vm.person.save().then(function(response) {
                console.log(response);
                toastr.success('Контакт был успешно обновлен', 'Обновлен', {timeOut: 2000, closeButton: true});
                $state.reload();
            }, function(error) {
                console.log(error);
                toastr.error(response.error, 'Что-то пошло не так', {timeOut: 2000, closeButton: true});
            });
            return true;
        };

        

    }
})();