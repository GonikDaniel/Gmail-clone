(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTabNav', TabNav);
    function TabNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/tab-nav.tpl.html',
            controller: TabNavCtrl
        };
    }

    TabNavCtrl.$inject = ['$scope', '$location'];
    function TabNavCtrl($scope, $location) {
        $scope.isTab = function(name) {
            return new RegExp('/' + name + '($|/)').test($location.path());
        };

        $scope.changeTab = function(tab) {
            $location.search('tab', tab);
        };
    }
})();