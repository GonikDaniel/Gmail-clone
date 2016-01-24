(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgMailList', MailList);

    function MailList() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                mail: "="
            },
            templateUrl: 'app/components/mail-list.tpl.html',
            controller: MailListCtrl,
            controllerAs: 'mailListCtrl',
            link: link
        };
    }
    
    MailListCtrl.$inject = ['$scope', '$location', '$compile'];
    function MailListCtrl($scope, $location, $compile) {
        var vm = this;

        vm.readMail = function(id) {
            $location.search('mail', id);
        };
        
    }

    function link(scope, elem, attr, ctrl) {
        
    }
})();