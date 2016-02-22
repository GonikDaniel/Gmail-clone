(function() {
    'use strict';
        
    beforeEach(module('dgGmail'));

    describe('MailReadController', function() {
        var  q, $httpBackend, Restangular, MailReadController, 
             scope, mail, settings, utils,
             $stateParams;

        // set default stateParams
        $stateParams = { mailId: 666 };

        beforeEach(inject(function($controller, $rootScope, $q, _$httpBackend_, _Restangular_, _mail_, _settings_, _utils_) {
            mail = _mail_;
            settings = _settings_;
            utils = _utils_;
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            Restangular = _Restangular_;
            q = $q;

            // var mockToReturn = { id: 1666, title: "Mail666" };

            // $httpBackend.whenGET('http://localhost:6660/mail/' + $stateParams.mailId).respond(mockToReturn);
            // $httpBackend.expectGET('http://localhost:6660/mail/' + $stateParams.mailId);

            // spyOn(Restangular, 'one').and.callThrough();

            MailReadController = $controller('MailReadController', { 
                $scope: scope, 
                $stateParams: $stateParams,
                mail: mail, 
                settings: settings 
            });
        }));


        it('mailId should be defined', function() {
            expect(MailReadController.mailId).toBeDefined();
        });

        it('should create "mail" model with mail fetched from xhr', function(done) {
            var deferred = q.defer();
            spyOn(mail, 'getById').and.returnValue(deferred.promise);
            var selectedMail = { id: 666, title: "Mail666" };
            deferred.resolve(selectedMail);

            expect(MailReadController.mails).toBeUndefined();

            done();
            expect(MailReadController.mails).toEqual({ id: 666, title: "Mail666" });


            // mail.getById($stateParams.mailId).then(function(res) {
            //     MailReadController.mail = utils.sanitizeRestangularOne(res);
            //     // console.log(MailReadController.mail);
            //     done();
            //     expect(MailReadController.mails).toEqual({ id: 1666, title: "Mail666" });
            // });
            // expect(Restangular.one).toHaveBeenCalledWith('mail', 666);

            // $httpBackend.flush();
        });


    });
    
})();