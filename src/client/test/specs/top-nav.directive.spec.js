(function() {
    'use strict';

    describe('TopNav directive', function() {
        var rootScope, scope, state, element, TopNavCtrl, 
            mail, settings, ngDialog, AuthService;

        beforeEach(module('dgGmail'));

        beforeEach(inject(function($controller, $q, $rootScope, $compile, $state, $timeout, _mail_, _settings_, _ngDialog_, _AuthService_) {
            scope = $rootScope.$new();
            rootScope = $rootScope;
            state = $state;
            var deferred = $q.defer();
            mail = _mail_;
            settings = _settings_;
            ngDialog = _ngDialog_;
            AuthService = _AuthService_;

            spyOn(AuthService, 'logout').and.callThrough();

            spyOn($rootScope, '$broadcast').and.callThrough();
            spyOn($state, 'go');

            spyOn(settings, 'getPage').and.returnValue(1);
            spyOn(settings, 'setPage').and.callThrough();
            spyOn(settings, 'getMailsByPage').and.returnValue(20);

            element = angular.element('<dg-top-nav></dg-top-nav>');
            $compile(element)(scope);
            $rootScope.$digest();
            // scope = element.isolateScope();

            TopNavCtrl = $controller('TopNavCtrl', {
                $scope: scope,
                $state: state, 
                mail: mail, 
                settings: settings, 
                ngDialog: ngDialog, 
                $timeout: $timeout, 
                AuthService: AuthService
            });
        }));



        it('should check default settings', function() {
            expect(settings.getMailsByPage).toHaveBeenCalled();
            expect(TopNavCtrl.page).toBe(1);
        });
        

        it('should check AuthService logout call', function() {
            TopNavCtrl.logout();
            expect(AuthService.logout).toHaveBeenCalled();
        });


        it('should update state and settings value on boxChange', function(done) {
            expect(TopNavCtrl.page).toBe(1);
            expect(settings.getPage).toHaveBeenCalled();

            rootScope.$broadcast('boxChange', 'Sent');

            expect(settings.setPage).toHaveBeenCalledWith(1);
            expect(state.go).toHaveBeenCalledWith('app.mail', { box: 'Inbox', page : 1 });
            done();
        });

        it('should check navigation with goToPage method', function(done) {
            spyOn(scope, '$emit');
            TopNavCtrl.page = 2;
            TopNavCtrl.goToPage('back');
            expect(settings.setPage).toHaveBeenCalledWith(1);

            TopNavCtrl.goToPage('forward');
            expect(settings.setPage).toHaveBeenCalledWith(2);

            expect(state.go).toHaveBeenCalledWith('app.mail', { box: 'Inbox', page : 1 });
            expect(scope.$emit).toHaveBeenCalledWith('pageChange');
            done();
        });

        it('should check ngDialog call', function(done) {
            spyOn(ngDialog, 'open');
            TopNavCtrl.showCalc();

            expect(ngDialog.open).toHaveBeenCalled();
            done();
        });

        it('should check refresh method', function(done) {
            spyOn(mail, 'clearCache').and.callThrough();
            TopNavCtrl.refresh();

            done();
            expect(scope.$broadcast).toHaveBeenCalledWith('boxChange', 'Inbox');
            expect(mail.clearCache).toHaveBeenCalled();
        });


    });
    
})();