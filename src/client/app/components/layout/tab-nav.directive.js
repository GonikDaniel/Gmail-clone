(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTabNav', TabNav);
    function TabNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/layout/tab-nav.tpl.html',
            controller: 'TabNavCtrl',
            controllerAs: 'tabNavCtrl',
            // scope: {},
            bindToController: true
        };
    }

    angular.module('dgGmail').controller('TabNavCtrl', TabNavCtrl);

    TabNavCtrl.$inject = ['$state', '$stateParams'];
    function TabNavCtrl($state, $stateParams) {
        var vm = this;

        vm.isTab = function(tab) {
            return ~(tab.indexOf($stateParams.tab));
        };

        vm.changeTab = function(tab) {
            // $location.search('tab', tab);
            // $state.go('mail?box=:box&n=:page', {tab: tab});
            $state.go('app.mail', { tab : tab });
        };
    }
})();