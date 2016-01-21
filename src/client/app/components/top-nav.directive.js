(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTopNav', TopNav);
    
    function TopNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/top-nav.tpl.html',
            controller: TopNavCtrl
        };
    }

    TopNavCtrl.$inject = ['$scope', '$location', 'mail', 'settings'];
    function TopNavCtrl($scope, $location, mail, settings) {
        var mailsByPage = settings.getMailsByPage();
        $scope.page = settings.getPage();
        
        paginationCalc();
        updateTotal();

        /////////////

        function updateTotal() {
            $scope.box = $location.search().box;
            $scope.totals = mail.getTotals();
        }

        function paginationCalc() {
            $scope.firstMail = ($scope.page - 1) * mailsByPage + 1;
            $scope.lastMail  = mailsByPage * $scope.page;
        }

        $scope.$on('boxChange', function(){
            updateTotal();
        });

        $scope.$watch('page', function(newValue, oldValue, scope) {
            paginationCalc();
        });

        $scope.goToPage = function(dir) {
            if (dir === 'back' && $scope.page !== 1) {
                $scope.page--;
                settings.setPage($scope.page);
            } else if (dir === 'forward') {
                $scope.page++;
                settings.setPage($scope.page);
            }
            $scope.$emit('pageChange');
        };
    }
})();