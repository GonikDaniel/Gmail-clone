(function(){
    'use strict';

    angular.module('dgGmail')

        .constant('ENV', 'production')
        // .constant('ENV', 'dev')

        .config(config)    

        .run(run);

    run.$inject = ['$rootScope', '$state', '$stateParams', '$urlMatcherFactory', 'SessionService'];
    function run($rootScope, $state, $stateParams, $urlMatcherFactory, SessionService) {
        $rootScope.title = 'Gmail clone';
        $rootScope.$stateParams = $stateParams;
        $rootScope.$state = $state;
        $urlMatcherFactory.caseInsensitive(true);

        $rootScope.user = null;

        // При каждом переходе нам необходимо удедиться, что у пользователя есть доступ
        $rootScope.$on('$stateChangeStart',
          function (event, toState, toParams, fromState, fromParams) {
            SessionService.checkAccess(event, toState, toParams, fromState, fromParams);
          }
        );

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $state.current = toState;
            }
        );
    }


    config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', 'RestangularProvider', 'ENV'];
    function config($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, ENV) {
        if( ENV === 'production' ) {
            RestangularProvider.setBaseUrl('https://gmail-clone.herokuapp.com/');
        } else {
            RestangularProvider.setBaseUrl('http://localhost:6660/'); // express on locale machine
            // RestangularProvider.setBaseUrl('http://localhost:3000/'); // to use with json-server and have no problem with node and express routes
        }
        
        $httpProvider.interceptors.push('AuthInterceptor');
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('login', {
                url:'/login',
                template: '<gmail-login></gmail-login>',
                data: {
                  'noLogin': true
                }
            })

            .state('app', {
                abstract: true,
                url:'/app',
                templateUrl: 'app/components/app.tpl.html',
                resolve: {
                    mailPrepService: mailPrepService
                }
            })

            .state('app.mail', {
                url:'/mail/:box/:page',
                templateUrl: 'app/mail/index.tpl.html',
                controller: 'MailIndexController',
                controllerAs: 'indexCtrl',
            })
                .state('app.read', {
                    url:'/mail/{mailId:[0-9]{1,}}',
                    templateUrl: 'app/mail/read.tpl.html',
                    controller: 'MailReadController',
                    controllerAs: 'readCtrl'
                })
                .state('app.mail.new', {
                    url:'/mail/new',
                    templateUrl: 'app/mail/index.tpl.html',
                    controller: 'MailIndexController',
                    controllerAs: 'indexCtrl',
                })
            .state('app.contacts', {
                abstract: true,
                url: '/contacts',
                templateUrl: 'app/contacts/contacts.tpl.html',
                controller: 'ContactsController',
                controllerAs: 'contactsCtrl'
            })
                .state('app.contacts.list', {
                    url: '/list',
                    templateUrl: 'app/contacts/contacts.list.tpl.html',
                    // controller: 'ContactsController',
                    // controllerAs: 'contactsCtrl'
                })
                .state('app.contacts.detail', {
                    url: '/:id',
                    templateUrl: 'app/contacts/contacts.detail.tpl.html',
                    controller: 'ContactsController',
                    controllerAs: 'contactsCtrl'
                })
            .state('app.calc', {
                url: '/calc',
                templateUrl: 'app/components/calculator/calc.tpl.html',
                controller: 'CalcController',
                controllerAs: 'calcCtrl',
            });

    }

    mailPrepService.$inject = ['mail'];
    function mailPrepService(mail) {
        if (!mail.getAllInBox('Inbox')) {
            return mail.getAll().then(function(mails) {
                mail.setCache(mails[0]);
            }, function(error) {
                console.log(error);
            });
        }
    }
    
})();