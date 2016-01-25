(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTopNav', TopNav);
    
    function TopNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/top-nav.tpl.html',
            controller: TopNavCtrl,
            controllerAs: 'topNavCtrl',
            bindToController: true
        };
    }

    TopNavCtrl.$inject = ['$scope', '$location', 'mail', 'settings', 'ngDialog'];
    function TopNavCtrl($scope, $location, mail, settings, ngDialog) {
        var vm = this;

        var mailsByPage = settings.getMailsByPage();
        vm.page = settings.getPage();
        
        paginationCalc();
        updateTotal();

        /////////////

        function updateTotal() {
            vm.box = settings.getBox();
            vm.totals = mail.getTotals();
        }

        function paginationCalc() {
            vm.firstMail = (vm.page - 1) * mailsByPage + 1;
            vm.lastMail  = mailsByPage * vm.page;
        }

        $scope.$on('boxChange', function(){
            updateTotal();
        });

        $scope.$watch('page', function(newValue, oldValue, scope) {
            paginationCalc();
        });

        $scope.$watch('topNavCtrl.selectAllCheckbox', function(newValue) {
             newValue ? vm.select('all') : vm.select('none');
        });

        vm.goToPage = function(dir) {
            if (dir === 'back' && vm.page !== 1) {
                vm.page--;
                settings.setPage(vm.page);
            } else if (dir === 'forward') {
                vm.page++;
                settings.setPage(vm.page);
            }
            $scope.$emit('pageChange');
        };

        vm.select = function(typeOfSelected) {
            $scope.$broadcast('select', typeOfSelected);
        };

        vm.showCalc = function() {
            ngDialog.open({
                template: 'app/components/calculator/calc.tpl.html',
                // className: 'calc-popup',
                controller: 'CalcController',
                controllerAs: 'calcCtrl'
            });  
        };
    }
})();