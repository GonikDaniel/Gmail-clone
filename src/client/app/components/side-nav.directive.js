(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgSideNav', function() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/side-nav.tpl.html',
            controller: ['$scope', '$location', function($scope, $location) {
                $scope.isPage = function(name) {
                    return new RegExp('/' + name + '($|/)').test($location.path());
                };

                $scope.goTo = function(mailbox) {
                    $location.path('/' + mailbox);
                };
            }]
        };
    });
})();