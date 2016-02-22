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
            templateUrl: 'app/mail/components/mail-list.tpl.html',
            controller: MailListCtrl,
            controllerAs: 'mailListCtrl',
            link: link
        };
    }
    
    MailListCtrl.$inject = ['$scope', '$location', '$compile'];
    function MailListCtrl($scope, $location, $compile) {
        var vm = this;        
    }

    function link(scope, elem, attr, ctrl) {
        
    }
})();