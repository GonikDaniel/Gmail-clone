(function(){
    'use strict';

    angular.module('dgGmail')

    .constant('ENV', 'production')
    // .constant('ENV', 'dev')

    .config(config)    

    .run(run);

    run.$inject = ['$rootScope', '$stateParams', '$urlMatcherFactory'];
    function run($rootScope, $stateParams, $urlMatcherFactory) {
        $rootScope.title = 'Gmail clone';
        $rootScope.$stateParams = $stateParams;
        $urlMatcherFactory.caseInsensitive(true);
    }


    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider', 'ENV'];
    function config($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, ENV) {
        if( ENV === 'production' ) {
            RestangularProvider.setBaseUrl('https://gmail-clone.herokuapp.com/');
        } else {
            RestangularProvider.setBaseUrl('http://localhost:6660/'); // express on locale machine
            // RestangularProvider.setBaseUrl('http://localhost:3000/'); // to use with json-server and have no problem with node and express routes
        }
        
        // $urlRouterProvider.otherwise("/mail/Inbox/1");

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
                    url:'/mail/new',
                    templateUrl: 'app/mail/index.tpl.html',
                    controller: 'MailIndexController',
                    controllerAs: 'indexCtrl',
                })
            .state('contacts', {
                abstract: true,
                url: '/contacts',
                templateUrl: 'app/contacts/contacts.tpl.html',
                controller: 'ContactsController',
                controllerAs: 'contactsCtrl'
            })
                .state('contacts.list', {
                    url: '/list',
                    templateUrl: 'app/contacts/contacts.list.tpl.html'
                })
                .state('contacts.detail', {
                    url: '/:id',
                    templateUrl: 'app/contacts/contacts.detail.tpl.html',
                    controller: 'ContactsController',
                    controllerAs: 'contactsCtrl'
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