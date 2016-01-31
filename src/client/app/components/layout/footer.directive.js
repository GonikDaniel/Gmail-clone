(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgFooter', Footer);

    function Footer() {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: 'app/components/layout/footer.tpl.html',
            controller: FooterCtrl
        };
    }
    
    FooterCtrl.$inject = [];
    function FooterCtrl() {
        
    }
})();