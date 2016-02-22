(function() {
    'use strict';
        
    beforeEach(module('dgGmail'));

    describe('MailIndexController', function() {
        var  $httpBackend, Restangular, q, MailIndexController, scope, mail, settings, utils;

        beforeEach(inject(function($controller, $rootScope, $q, _$httpBackend_, _Restangular_, _mail_, _settings_, _utils_) {
            mail = _mail_;
            settings = _settings_;
            utils = _utils_;
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            Restangular = _Restangular_;
            q = $q;

            // var mockToReturn = [
            //     { id: 1, title: "Mail1" }, 
            //     { id: 2, title: "Mail2" }
            // ];

            // $httpBackend.whenGET('http://localhost:6660/mail').respond(mockToReturn);
            // $httpBackend.expectGET('http://localhost:6660/mail');

            spyOn(Restangular, 'all').and.callThrough();
            spyOn($rootScope, '$broadcast').and.callThrough();
            spyOn(settings, 'getBox').and.returnValue('Inbox');
            spyOn(settings, 'getPage').and.returnValue(1);
            spyOn(settings, 'getMailsByPage').and.returnValue(20);

            MailIndexController = $controller('MailIndexController', { 
                $scope: scope, 
                mail: mail, 
                settings: settings 
            });
        }));

        it('should check settings.service calls', function(done) {
            done();

            expect(settings.getBox).toHaveBeenCalled();
            expect(settings.getPage).toHaveBeenCalled();
            expect(settings.getMailsByPage).toHaveBeenCalled();
        });

        it('should create "mails" model with 2 mails fetched from xhr', function(done) {
            var deferred = q.defer();
            spyOn(mail, 'getAllInBox').and.returnValue(deferred.promise);
            var allMails = [
                { id: 1, title: "Mail1" }, 
                { id: 2, title: "Mail2" }
            ];
            deferred.resolve(allMails);

            expect(MailIndexController.mails).toEqual([]);

            done();
            expect(MailIndexController.mails).toEqual(
                [{id: 1, title: 'Mail1'}, {id: 2, title: 'Mail2'}]
            );
            // mail.getAll().then(function(res) {
            //     MailIndexController.mails = utils.sanitizeRestangularAll(res);
            //     // console.log(MailIndexController.mails);
            // });
            // expect(Restangular.all).toHaveBeenCalledWith('mail');
            // done();
            // $httpBackend.flush();

        });

        it('should check box changes', function(done) {
            scope.$broadcast('boxChange', 'Sent');

            done();
            expect(scope.$broadcast).toHaveBeenCalledWith('boxChange', 'Sent');
        });

        it('should check selection on mails (checkboxes)', function(done) {
            MailIndexController.mails = [{id: 1, title: 'Mail1'}, {id: 2, title: 'Mail2'}];
            expect(MailIndexController.mails[0].selected).toBeFalsy();

            scope.$broadcast('select', 'all');
            expect(MailIndexController.mails[0].selected).toBe(true);

            scope.$broadcast('select', 'none');
            expect(MailIndexController.mails[0].selected).toBe(false);

            done();
        });

    });
    
})();