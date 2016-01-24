(function(){
    'use strict';

    angular.module('dgGmail').controller('MailIndexController', MailIndexController);
    
    MailIndexController.$inject = ['$scope', '$location', '$timeout', 'mail', 'settings'];
    function MailIndexController($scope, $location, $timeout, mail, settings) {
        var vm = this;

        var box = settings.getBox();
        vm.page = settings.getPage();
        vm.mailsByPage = settings.getMailsByPage();
        activate(box);

        /////////////////

        function activate(box) {
            $timeout(function() {
                vm.mails = mail.getAllInBox(box);
            }, 300);

            vm.fromMail = vm.page * vm.mailsByPage;
            // mail.getAll().then(function(mails) {
            //     vm.mails = mails;
            // }, function(error) {
            //     console.log(error);
            // });  
        }

        $scope.$on('boxChange', function(e, box){

            vm.mails = mail.getAllInBox(box);
            vm.fromMail = vm.page * vm.mailsByPage;

        });

    }
    
})();