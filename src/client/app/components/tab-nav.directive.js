(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTabNav', TabNav);
    function TabNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/tab-nav.tpl.html',
            controller: TabNavCtrl,
            controllerAs: 'tabNavCtrl',
            bindToController: true
        };
    }

    TabNavCtrl.$inject = ['$scope', '$location', '$state'];
    function TabNavCtrl($scope, $location, $state) {
        var vm = this;

        vm.isTab = function(name) {
            return new RegExp('/' + name + '($|/)').test($location.path());
        };

        vm.changeTab = function(tab) {
            // $location.search('tab', tab);
            // $state.go('mail?box=:box&n=:page', {tab: tab});
            $state.go('mail', { tab : tab });
            console.log($location.absUrl());
        };
    }
})();