(function(){
    'use strict';

    angular.module('dgGmail').controller('MailReadController', MailReadController);

    MailReadController.$inject = ['$scope', '$stateParams', 'mail', 'settings'];
    function MailReadController($scope, $stateParams, mail, settings) {
        var vm = this;
        vm.mailId = $stateParams.mailId;

        mail.getById(vm.mailId).then(function(selectedMail) {
            vm.mail = selectedMail;
            selectedMail.read = true;
            // selectedMail.save();    // PUT Restangular - saving "read: true" in our selected mail
            
            // var box = settings.getBox();
            // mail.updateTotals(box, 'unread', '-');  // temp.method to test update of data
            // vm.mail.ago = moment(vm.mail.date).fromNow();
        }, function(error) {
            console.log(error);
        });
    }
    
})();