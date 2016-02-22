(function() {
    'use strict';

    describe('TabNav directive', function() {
        var scope, state, element, SideNavCtrl, 
            state, $stateParams = {},
            mail, settings;

        beforeEach(module('dgGmail'));

        beforeEach(inject(function($controller, $rootScope, $compile, $state, _mail_, _settings_) {
            scope = $rootScope.$new();
            state = $state;
            mail = _mail_;
            settings = _settings_;

            spyOn($state, 'go');
            spyOn(mail, 'getTotals').and.returnValue({});
            spyOn(settings, 'setBox').and.callThrough();

            element = angular.element('<dg-side-nav></dg-side-nav>');
            $compile(element)(scope);
            $rootScope.$digest();
            // scope = element.isolateScope();

            SideNavCtrl = $controller('SideNavCtrl', {
                $scope: scope,
                mail: mail,
                settings: settings,
                $stateParams: $stateParams,
                $state: $state
            });
        }));

        it('should set default totals', function() {
            expect(mail.getTotals).toHaveBeenCalled();
            expect(SideNavCtrl.totals).toEqual({});
        });

        it('should check box change with openBox method', function() {
            SideNavCtrl.openBox('Sent');

            expect(state.go).toHaveBeenCalledWith('app.mail', { box: 'Sent', page : 1 });
            expect(settings.setBox).toHaveBeenCalledWith('Sent');
        });

    });
    
})();