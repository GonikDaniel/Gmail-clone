(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTopNav', function() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/top-nav.tpl.html',
            controller: ['$scope', '$location', function($scope, $location) {
                
            }]
        };
    });
})();