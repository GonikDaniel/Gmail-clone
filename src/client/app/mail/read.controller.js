(function(){
    'use strict';

    angular.module('dgGmail').controller('MailReadController', MailReadController);

    MailReadController.$inject = ['$scope', '$routeParams', 'mail', 'settings'];
    function MailReadController($scope, $routeParams, mail, settings) {
        var vm = this;
        var mailId = $routeParams.mailId;

        mail.getById(mailId).then(function(selectedMail) {
            vm.mail = selectedMail;
            selectedMail.read = true;
            selectedMail.save();    // PUT Restangular - saving "read: true" in our selected mail
            
            var box = settings.getBox();
            mail.updateTotals(box, 'unread', '-');  // temp.method to test update of data
            vm.mail.ago = moment(vm.mail.date).fromNow();
        }, function(error) {
            console.log(error);
        });
    }
    
})();