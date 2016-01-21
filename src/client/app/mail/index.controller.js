(function(){
    'use strict';

    angular.module('dgGmail').controller('MailIndexController', MailIndexController);
    MailIndexController.$inject = ['$scope', '$location', 'mail', '$timeout'];

    function MailIndexController($scope, $location, mail, $timeout) {
        // default mailbox is 'inbox'
        var box = 'Inbox';
        if (!$location.search().box) {
            $location.search('box', 'Inbox');
        } else {
            box = $location.search().box;
        }
        activate(box);

        // viewmodel way
        // var vm = this;

        // mail.getAll().then(function(mails) {
        //     vm.mails = mails;
        // }, function(error) {
        //     console.log(error);
        // });

        // return vm;

        function activate(box) {
            console.log(box)
            $timeout(function() {
                $scope.mails = mail.getAllInBox(box);
            }, 0);
            // mail.getAll().then(function(mails) {
            //     $scope.mails = mails;
            // }, function(error) {
            //     console.log(error);
            // });  
        }      
    }
    
})();