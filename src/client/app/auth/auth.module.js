(function() {
    'use strict';

    angular
        .module('dgGmail.auth', ['ngCookies', 'restangular'])
        .service('SessionService', SessionService)
        .service('AuthService', AuthService)
        .service('AuthInterceptor', AuthInterceptor);

    SessionService.$inject = ['$injector'];
    /* @ngInject */
    function SessionService($injector) {
        this.checkAccess = checkAccess;

        ////////////////

        function checkAccess(event, toState, toParams, fromState, fromParams) {
            var $scope = $injector.get('$rootScope'),
            $sessionStorage = $injector.get('$sessionStorage');

            if (toState.data !== undefined) {
                if (toState.data.noLogin !== undefined && toState.data.noLogin) {
                    // какие-то действия перед входом без авторизации
                }
            } else {
                // вход с авторизацией
                if ($sessionStorage.user) {
                    $scope.$root.user = $sessionStorage.user;
                } else {
                    // если пользователь не авторизован - отправляем на страницу авторизации
                    event.preventDefault();
                    $scope.$state.go('login');
                }
            }
        }
    }


    AuthService.$inject = ['$rootScope', '$http', '$state', '$cookies', '$sessionStorage', 'Restangular'];
    /* @ngInject */
    function AuthService($rootScope, $http, $state, $cookies, $sessionStorage, Restangular) {
        var self = this;
        this.status = {
            isAuthorized: false
        };

        this.loginByCredentials = function(credentials) {
            // return Restangular.all('users').getList().then(function(users) {
            //     return users.some(function(user){ return user.email === 'admin@admin.com' && user.password === 'admin' })
            // });
            return Restangular.all('users').post({ email: credentials.login, password: credentials.password })
                .then(function(token) {
                    return self.loginByToken(token);
                });
        };

        this.loginByToken = function(token) {
            // set default header "token"
            Restangular.setDefaultHeaders({"X-Token": token});

            return Restangular.all('users').getList().then(function(user) {
                self.status.isAuthorized = true;
                $rootScope.currentUser = user;
                $sessionStorage.user = user;
                return user[0].email;
            }).catch(function(error) {
                toastr.error(error, 'Что-то пошло не так', {timeOut: 3000, closeButton: true});
                console.log(error);
            });
        };

        this.logout = function() {
            self.status.isAuthorized = false;
            $cookies.accessToken = '';
            delete $sessionStorage.user;

            $state.go('login');
            // Restangular.all('users').remove();
        };
    }


    AuthInterceptor.$inject = ['$q', '$injector'];
    /* @ngInject */
    function AuthInterceptor($q, $injector) {
        this.responseCheck = responseCheck;

        ////////////////

         function responseCheck(response) {
            if(response.status === 401) {
                $injector.get('$state').go('login');
            } else if(response.status === 500) {
                alert('ohhh');
            }
            return $q.reject(response);
        }
    }

})();