(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgTopNav', TopNav);
    
    function TopNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/top-nav.tpl.html'
        };
    }
})();