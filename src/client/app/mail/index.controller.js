(function(){
    'use strict';

    angular.module('dgGmail').controller('MailIndexController', MailIndexController);
    MailIndexController.$inject = ['$scope', '$location', 'mail'];

    function MailIndexController($scope, $location, mail) {
        // default mailbox is 'inbox'
        if (!$location.search().box) {
            $location.search('box', 'inbox');
        }

        // viewmodel way
        // var vm = this;

        // mail.getAll().then(function(mails) {
        //     vm.mails = mails;
        // }, function(error) {
        //     console.log(error);
        // });

        // return vm;

        mail.getAll().then(function(mails) {
            $scope.mails = mails;
        }, function(error) {
            console.log(error);
        });        
    }
    
})();