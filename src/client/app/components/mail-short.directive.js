(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgMailShort', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                mail: "="
            },
            templateUrl: 'app/components/mail-short.tpl.html',
            controller: ['$scope', '$location', function($scope, $location) {
                $scope.readMail = function(id) {
                    $location.search('mail', id);
                };
            }]
        };
    });
})();