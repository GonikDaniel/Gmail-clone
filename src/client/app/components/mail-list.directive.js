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
            link: link
        };
    }
    
    MailListCtrl.$inject = ['$scope', '$location', '$compile'];
    function MailListCtrl($scope, $location, $compile) {

        $scope.readMail = function(id) {
            $location.search('mail', id);
        };
        this.$compile = $compile;
    }

    function link(scope, elem, attr, ctrl) {
        // scope.$on('boxChange', function(e, box){
        //     ctrl.$compile(elem)(scope);
        // });
    }
})();