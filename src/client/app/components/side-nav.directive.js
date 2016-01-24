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

    SideNavCtrl.$inject = ['$scope', '$location', 'mail', 'settings'];
    function SideNavCtrl($scope, $location, mail, settings) {
        activate();

        function activate() {
            $scope.totals = mail.getTotals();
        }

        $scope.isBoxActive = function(box) {
            return ~(box.indexOf($location.search().box));
        };

        $scope.openBox = function(mailbox) {
            $location.path('/mail/').search({'box': mailbox, 'page': 1});
            settings.setBox(mailbox);
            $scope.$broadcast('boxChange', mailbox);
        };
    }
    
})();