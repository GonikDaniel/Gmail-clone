(function(){
    'use strict';

    angular.module('dgGmail').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/admin'
            })

            .when('/mail', {
                templateUrl: 'app/mail/index.tpl.html',
                controller: 'MailIndexController',
                controllerAs: 'mail.index'
            })

            .when('/mail/new', {
                templateUrl: 'app/mail/new.tpl.html',
                controller: 'MailCreateController',
                controllerAs: 'mail.new',
            })

            .when('/mail/:id', {
                templateUrl: 'app/mail/read.tpl.html',
                controller: 'MailReadController',
                controllerAs: 'mail.read',
                // reloadOnSearch: false
            })

            .otherwise({redirectTo: '/'});
            // if(window.history && window.history.pushState){
            //     $locationProvider.html5Mode(true);
            // }
    }])
    

    

    .run(function ($rootScope) {
        $rootScope.title = 'Gmail clone';
    });
    
})();