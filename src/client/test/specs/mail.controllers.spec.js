(function() {
    'use strict';

    describe('Mails controllers:', function() {
        
        beforeEach(module('dgGmail'));

        describe('MailIndexController', function() {
            var  $httpBackend, Restangular, MailIndexController, scope, mail, settings, utils;

            beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _Restangular_, _mail_, _settings_, _utils_) {
                mail = _mail_;
                settings = _settings_;
                utils = _utils_;
                scope = $rootScope.$new();
                $httpBackend = _$httpBackend_;
                Restangular = _Restangular_;

                var mockToReturn = [
                    { id: 1, title: "Mail1" }, 
                    { id: 2, title: "Mail2" }
                ];

                $httpBackend.expectGET('http://localhost:6660/mail').respond(mockToReturn);

                spyOn(Restangular, 'all').and.callThrough();
                spyOn(settings, 'getBox').and.returnValue('Inbox');
                spyOn(settings, 'getPage').and.returnValue(1);
                spyOn(settings, 'getMailsByPage').and.returnValue(20);

                MailIndexController = $controller('MailIndexController', { 
                    $scope: scope, 
                    mail: mail, 
                    settings: settings 
                });
            }));

            afterEach(function() {
                // $httpBackend.verifyNoOutstandingExpectation();
                // $httpBackend.verifyNoOutstandingRequest();
            });

            it('should check settings.service calls', function() {
                expect(settings.getBox).toHaveBeenCalled();
                expect(settings.getPage).toHaveBeenCalled();
                expect(settings.getMailsByPage).toHaveBeenCalled();
            });

            it('should create "mails" model with 2 mails fetched from xhr', function() {
                var mails = [];

                expect(MailIndexController.mails).toEqual([]);
                mail.getAll().then(function(res) {
                    MailIndexController.mails = utils.sanitizeRestangularAll(res);
                    console.log(MailIndexController.mails);
                });
                expect(Restangular.all).toHaveBeenCalledWith('mail');
                $httpBackend.flush();

                expect(MailIndexController.mails).toEqual(
                    [{id: 1, title: 'Mail1'}, {id: 2, title: 'Mail2'}]
                );  
            });

        });


    });
    
})();