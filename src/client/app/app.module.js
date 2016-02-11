(function() {
    'use strict';

    angular.module('dgGmail', [
        'dgGmail.auth',
        'dgGmail.contacts',
        'ngStorage',
        'ngRoute',
        'ui.router',
        'ngCookies',
        'restangular',
        'ngDialog',
        'calculator'
    ]);

})();