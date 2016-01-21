(function(){
    'use strict';

    angular.module('dgGmail').factory('mail', mail);
    mail.$inject = ['Restangular', '$timeout'];

    function mail(Restangular, $timeout) {
        var boxes = ['Inbox', 'Starred', 'Important', 'Sent', 'Drafts'];
        var mailStorage = {};
        var totals = {};
        var factory = {
            getAll: getAllMails,
            getAllInBox: getAllInBox,
            getById: getMailById    
        };

        return factory;

        ///////////////////

        function getAllMails() {
            for (var i = 0; i < boxes.length; i++) {
                getMailsInBox(boxes[i]);
            }

            function getMailsInBox(box) {
                Restangular.all("mail?box_like=" + box).getList().then(function(mails) {
                    mailStorage[box] = mails;
                }, function(error) {
                    console.log(error);
                });
            }
        }

        function getAllInBox(box) {
            return mailStorage[box];
        }

        function getMailById(id) {
            return Restangular.one("mail", id);
        }

    }
    
})();

// getTotals with restangular
// var rest = Restangular.withConfig(function(RestangularConfigurer) {
//     RestangularConfigurer.setFullResponse(true);
// });
// rest.getList().then(function(response) {
//     console.log(response.headers('X-Total-Count'));
// });