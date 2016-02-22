(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTopNav', TopNav);
    
    function TopNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/layout/top-nav.tpl.html',
            controller: 'TopNavCtrl',
            controllerAs: 'topNavCtrl',
            // scope: {},
            bindToController: true
        };  
    }

    angular.module('dgGmail').controller('TopNavCtrl', TopNavCtrl);
    TopNavCtrl.$inject = ['$scope', '$state', 'mail', 'settings', 'ngDialog', '$timeout', 'AuthService'];
    function TopNavCtrl($scope, $state, mail, settings, ngDialog, $timeout, AuthService) {
        var vm = this;

        var mailsByPage = settings.getMailsByPage();
        vm.page = 1;
        
        paginationCalc();
        updateTotal();

        /////////////

        $scope.$on('boxChange', function(){
            settings.setPage(1);
            updateTotal();
            $state.go('app.mail', { box: vm.box, page : vm.page });
            paginationCalc();
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
            $state.go('app.mail', { box: vm.box, page : vm.page });
            paginationCalc();
            $scope.$emit('pageChange');
        };

        vm.select = function(typeOfSelected) {
            $scope.$broadcast('select', typeOfSelected);
        };

        vm.showCalc = function() {
            ngDialog.open({
                template: 'app/components/calculator/calc.tpl.html',
                controller: 'CalcController',
                controllerAs: 'calcCtrl'
            });  
        };

        vm.refresh = function() {
            mail.clearCache();
            var box = settings.getBox();
            $scope.$broadcast('boxChange', box);
            $timeout(function() {
                $state.go('app.mail');
                $state.reload();
            }, 100);
        };

        vm.logout = function() {
            AuthService.logout();
        };


        function updateTotal() {
            vm.page = settings.getPage();
            vm.box = settings.getBox();
            vm.totals = mail.getTotals();
        }

        function paginationCalc() {
            vm.firstMail = (vm.page - 1) * mailsByPage + 1;
            vm.lastMail  = mailsByPage * vm.page;
        }
    }
})();