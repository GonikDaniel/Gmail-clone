(function() {
    'use strict';

    describe('TabNav directive', function() {
        var scope, state, element, TabNavCtrl, $stateParams = {};

        beforeEach(module('dgGmail'));

        beforeEach(inject(function($controller, $rootScope, $compile, $state) {
            scope = $rootScope.$new();
            state = $state;


            element = angular.element('<dg-tab-nav></dg-tab-nav>');
            $compile(element)(scope);
            $rootScope.$digest();
            // scope = element.isolateScope();

            TabNavCtrl = $controller('TabNavCtrl', {
                $state: $state,
                $stateParams: $stateParams
            });
        }));

        it('should check tab detection', function() {
            $stateParams.tab = 'mainTab';
            TabNavCtrl.isTab('mainTab');
        });

    });
    
})();