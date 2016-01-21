(function(){
    'use strict';

    angular.module('dgGmail').controller('MailReadController', MailReadController);

    MailReadController.$inject = ['$scope', '$routeParams', 'mail'];
    function MailReadController($scope, $routeParams, mail) {
        var mailId = $routeParams.mailId;

        mail.getById(mailId).then(function(mail) {
            $scope.mail = mail;
            $scope.mail.ago = moment($scope.mail.date).fromNow();
        }, function(error) {
            console.log(error);
        });
    }
    
})();