(function(){
    'use strict';

    angular.module('dgGmail')

    .constant('ENV', 'production')
    // .constant('ENV', 'dev')

    .config(config)    

    .run(function ($rootScope) {
        $rootScope.title = 'Gmail clone';
    });


    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider', 'ENV'];
    function config($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, ENV) {
        if( ENV === 'production' ) {
            RestangularProvider.setBaseUrl('https://gmail-clone.herokuapp.com/');
        } else {
            RestangularProvider.setBaseUrl('http://localhost:6660/'); // express on locale machine
            // RestangularProvider.setBaseUrl('http://localhost:3000/'); // to use with json-server and have no problem with node and express routes
        }

        $urlRouterProvider.otherwise("/mail/Inbox/1");

        $stateProvider
            .state('mail', {
                url:'/mail/:box/:page',
                templateUrl: 'app/mail/index.tpl.html',
                controller: 'MailIndexController',
                controllerAs: 'indexCtrl',
                resolve: {
                    mailPrepService: mailPrepService
                }
            })
            .state('read', {
                url:'/mail/{mailId:[0-9]{1,}}',
                templateUrl: 'app/mail/read.tpl.html',
                controller: 'MailReadController',
                controllerAs: 'readCtrl'
            })
            .state('mail.new', {
                url:'/mail',
                templateUrl: 'app/mail/index.tpl.html',
                controller: 'MailIndexController',
                controllerAs: 'indexCtrl',
            })
            .state('calc', {
                url: '/calc',
                templateUrl: 'app/components/calculator/calc.tpl.html',
                controller: 'CalcController',
                controllerAs: 'calcCtrl',
            });
    }

    mailPrepService.$inject = ['mail'];
    function mailPrepService(mail) {
        mail.getAll();
    }
    
})();