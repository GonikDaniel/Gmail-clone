(function(){
    'use strict';

    angular.module('dgGmail').controller('MailIndexController', MailIndexController);
    
    MailIndexController.$inject = ['$scope', '$location', '$timeout', 'mail', 'settings'];
    function MailIndexController($scope, $location, $timeout, mail, settings) {
        var box = settings.getBox();
        $scope.page = settings.getPage();
        $scope.mailsByPage = settings.getMailsByPage();
        activate(box);

        /////////////////

        function activate(box) {
            $timeout(function() {
                $scope.mails = mail.getAllInBox(box);
            }, 1000);

            $scope.fromMail = $scope.page * $scope.mailsByPage;
            // mail.getAll().then(function(mails) {
            //     $scope.mails = mails;
            // }, function(error) {
            //     console.log(error);
            // });  
        }
    }
    
})();