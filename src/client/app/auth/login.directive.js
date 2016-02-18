(function() {
    'use strict';

    angular
        .module('dgGmail')
        .directive('gmailLogin', gmailLogin);

    gmailLogin.$inject = [];

    /* @ngInject */
    function gmailLogin() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: GmailLoginCtrl,
            controllerAs: 'gmailLoginCtrl',
            templateUrl: 'app/auth/login.tpl.html',
            link: link,
            restrict: 'E',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }


    GmailLoginCtrl.$inject = ['$rootScope', '$cookieStore', '$sessionStorage', '$state', 'AuthService'];
    /* @ngInject */
    function GmailLoginCtrl($rootScope, $cookieStore, $sessionStorage, $state, AuthService) {
        var vm = this;
        vm.credentials = {
            login: '',
            password: ''
        };

        // если по каким-то причинам попали на логин, но уже авторизованы - перенаправляем на дефолтный стейт
        if ($sessionStorage.user) {
            $state.go('app.mail', {box: 'Inbox', page: 1});
        }

        //логин по данным введенным в форму
        vm.login = function(credentials) {
            console.log(credentials);
            toastr.success('Авторизация', 'Подождите...', {timeOut: 3000, closeButton: true});
            AuthService.loginByCredentials(credentials).then(function (user) {
                toastr.clear();
                console.log(user);
                $state.go('app.mail', {box: 'Inbox', page: 1});
            }).catch(function () {
                console.log('auth error');
            });

            // $cookieStore.put('admin', true);
        };
    }
})();