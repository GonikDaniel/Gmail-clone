(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTabNav', function() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/tab-nav.tpl.html',
            controller: ['$scope', '$location', function($scope, $location) {
                $scope.isTab = function(name) {
                    return new RegExp('/' + name + '($|/)').test($location.path());
                };

                $scope.changeTab = function(tab) {
                    $location.search('tab', tab);
                };
            }]
        };
    });
})();