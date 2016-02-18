(function() {
    'use strict';

    angular.module('dgGmail', [
        'dgGmail.auth',
        'dgGmail.contacts',
        'ngStorage',
        'ui.router',
        'ngCookies',
        'restangular',
        'ngDialog',
        'calculator'
    ]);

})();