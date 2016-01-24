(function(){
    'use strict';

    angular.module('dgGmail').controller('MailReadController', MailReadController);

    MailReadController.$inject = ['$scope', '$routeParams', 'mail'];
    function MailReadController($scope, $routeParams, mail) {
        var vm = this;
        var mailId = $routeParams.mailId;

        mail.getById(mailId).then(function(mail) {
            vm.mail = mail;
            vm.mail.ago = moment(vm.mail.date).fromNow();
        }, function(error) {
            console.log(error);
        });
    }
    
})();