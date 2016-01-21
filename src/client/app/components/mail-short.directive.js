(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgMailShort', MailShort);

    function MailShort() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                mail: "="
            },
            templateUrl: 'app/components/mail-short.tpl.html',
            controller: MailShortCtrl
        };
    }
    
    MailShortCtrl.$inject = ['$scope', '$location'];
    function MailShortCtrl($scope, $location) {
        $scope.readMail = function(id) {
            $location.search('mail', id);
        };
    }
})();