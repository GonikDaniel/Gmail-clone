(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgSideNav', SideNav);
    function SideNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/side-nav.tpl.html',
            controller: SideNavCtrl
        };
    }

    SideNavCtrl.$inject = ['$scope', '$location', 'mail'];
    function SideNavCtrl($scope, $location, mail) {
        activate();

        function activate() {
            $scope.totals = mail.getTotals();
        }

        $scope.isBoxActive = function(box) {
            return ~(box.indexOf($location.search().box));
        };

        $scope.openBox = function(mailbox) {
            $location.search('box', mailbox);
            $scope.$emit('boxChange');
        };
    }
    
})();