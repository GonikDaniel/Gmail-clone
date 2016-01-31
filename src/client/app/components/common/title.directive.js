(function(){
    'use strict';

    angular.module('dgGmail').directive('title', function($timeout) {
       return function(scope, element, attrs) {
            $timeout(function() {
                $(element).tooltip();
            });

            scope.$on('$destroy', function() {
                $(element).tooltip('destroy');
            });
       };
    });
    
})();