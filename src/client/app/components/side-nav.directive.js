(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgSideNav', function() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/side-nav.tpl.html',
            controller: ['$scope', '$location', function($scope, $location) {
                $scope.isBoxActive = function(box) {
                    return ~(box.indexOf($location.search().box));
                };

                $scope.openBox = function(mailbox) {
                    $location.search('box', mailbox);
                };
            }]
        };
    });
})();