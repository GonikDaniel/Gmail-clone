(function(){
    'use strict';

    angular.module('dgGmail').factory('mail', mail);
    
    mail.$inject = ['Restangular', '$timeout', 'settings'];
    function mail(Restangular, $timeout, settings) {
        var boxes = ['Inbox', 'Starred', 'Important', 'Sent', 'Drafts'];
        var mailStorage = {};
        var totals = {};
        var factory = {
            getAll: getAllMails,
            getAllInBox: getAllInBox,
            getById: getMailById,
            setCache: setMailCache,
            clearCache: clearCache,
            getTotals: getTotals,
            updateTotals: updateTotals
        };

        return factory;

        ///////////////////

        function getAllMails() {
            return Restangular.all('mail').getList();
        }

        function setMailCache(mails) {
            mailStorage = mails;
        }

        function clearCache() {
            mailStorage = {};
        }

        function getAllInBox(box) {
            countTotals();
            return mailStorage[box];
        }

        function getMailById(id) {
            var box = settings.getBox();
            // if (mailStorage[box]) {
            //     var selectedMail = _.find(mailStorage[box], function(mail){
            //         return mail.id === +id;
            //     });
                
            //     selectedMail.unread = true;
            // }
            return Restangular.one('mail', id).get();
        }

        function countTotals() {
            for (var i = 0; i < boxes.length; i++) {
                totals[boxes[i]] = {};
                totals[boxes[i]].all = mailStorage[boxes[i]] ? mailStorage[boxes[i]].length : 0;
                totals[boxes[i]].unread = mailStorage[boxes[i]] ? mailStorage[boxes[i]].filter(function(mail) {
                    return mail.read === false;
                }).length : 0;
                totals[boxes[i]].important = mailStorage[boxes[i]] ? mailStorage[boxes[i]].filter(function(mail) {
                    return mail.important === true;
                }).length : 0;
            }
            return totals;
        }

        function getTotals() {
            return totals;
        }

        function updateTotals(box, typeOfTotal, operator) {
            getAllMails();
            if (totals[box]) {
                if (operator === '-') {
                    totals[box][typeOfTotal]--;
                } else if (operator === '+') {
                    totals[box][typeOfTotal]++;
                }
            }
        }

    }
    
})();
