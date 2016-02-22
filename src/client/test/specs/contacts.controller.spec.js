(function() {
    'use strict';
        
    beforeEach(module('dgGmail'));

    describe('ContactsController', function() {
        var  $httpBackend, Restangular, q,
             ContactsController, ctrl, scope, contacts, utils,
             $state, $stateParams = {}, ngDialog;

        beforeEach(inject(function($controller, $rootScope, _$state_, _ngDialog_, _$httpBackend_, _Restangular_, $q, _contacts_, _utils_) {
            contacts = _contacts_;
            utils = _utils_;
            ngDialog = _ngDialog_;
            scope = $rootScope.$new();
            ctrl = $controller;
            $state = _$state_;
            $httpBackend = _$httpBackend_;
            Restangular = _Restangular_;
            q = $q;


            var allContacts = [
                { id: 1, title: "Contact1" }, 
                { id: 2, title: "Contact2" }
            ];

            $httpBackend.whenGET('http://localhost:6660/contact').respond(allContacts);
            $httpBackend.expectGET('http://localhost:6660/contact');

            // var oneContact = [
            //     { id: 1, title: "Contact1" }
            // ];

            // $httpBackend.whenGET('http://localhost:6660/contact/1').respond(oneContact);
            // $httpBackend.expectGET('http://localhost:6660/contact/1');

            spyOn(Restangular, 'all').and.callThrough();
            spyOn(Restangular, 'one').and.callThrough();
            spyOn(ngDialog, 'open').and.callThrough();
            spyOn($state, 'go');
            
        }));

        
        it('should check search toggle and ngDialog open method', function(done) {
            ContactsController = ctrl('ContactsController', { 
                $scope: scope, 
                contacts: contacts, 
                $state: $state,
                $stateParams: $stateParams, 
                ngDialog: ngDialog
            });

            ContactsController.editContact(null);
            expect(ngDialog.open).toHaveBeenCalled();

            ContactsController.search();

            expect(ContactsController.showSearch).toBeUndefined();
            ContactsController.toggleSearch();
            expect(ContactsController.showSearch).toBe(true);

            ContactsController.toggleSearch();
            expect(ContactsController.showSearch).toBe(false);

            done();
        });
        

        it('should create "contacts" model with 2 contacts fetched from xhr', function(done) {
            var deferred = q.defer();
            spyOn(contacts, 'getAll').and.returnValue(deferred.promise);
            var allContacts = [
                { id: 1, title: "Contact1" }, 
                { id: 2, title: "Contact2" }
            ];
            deferred.resolve(allContacts);

            ContactsController = ctrl('ContactsController', { 
                $scope: scope, 
                contacts: contacts, 
                $state: $state,
                $stateParams: $stateParams, 
                ngDialog: ngDialog
            });

            done();

            expect(ContactsController.mails).toEqual(
                [{id: 1, title: 'Contact1'}, {id: 2, title: 'Contact2'}]
            );
            // expect(ContactsController.contacts).toBeUndefined();
            // contacts.getAll().then(function(res) {
            //     ContactsController.contacts = utils.sanitizeRestangularAll(res);
            //     done();
            //     expect(ContactsController.mails).toEqual(
            //         [{id: 1, title: 'Contact1'}, {id: 2, title: 'Contact2'}]
            //     );
            //     // console.log(ContactsController.contacts);
            // });
            // expect(Restangular.all).toHaveBeenCalledWith('contact');
            // $httpBackend.flush();
        });


        it('with certain stateParams of contactId we should get contact info', function(done) {
            var deferred = q.defer();
            spyOn(contacts, 'getDetail').and.returnValue(deferred.promise);
            var oneContact = { id: 1, title: "Contact1" };
            deferred.resolve(oneContact);

            $stateParams.id = 1;
            var contactId = 1;
            ContactsController = ctrl('ContactsController', { 
                $scope: scope,
                contacts: contacts, 
                $state: $state,
                $stateParams: $stateParams, 
                ngDialog: ngDialog
            });

            done();
            expect(ContactsController.person).toEqual(
                {id: 1, title: 'Contact1'}
            );

            // ContactsController.showDetails(contactId);

            // expect(ContactsController.person).toBeUndefined();
            // contacts.getDetail($stateParams.id).then(function(res) {
            //     ContactsController.person = utils.sanitizeRestangularOne(res);
            //     // console.log(ContactsController.person);
            //     done();
            //     expect(ContactsController.person).toEqual(
            //         {id: 1, title: 'Contact1'}
            //     );
            // });
            // expect(Restangular.one).toHaveBeenCalledWith('contact', 1);
            // $httpBackend.flush();
        });




        // describe('actions with predefined contacts - save and delete', function() {
        //     beforeEach(function() {
        //         $httpBackend.when("HEAD", "contact").respond();
        //         $httpBackend.when("TRACE", "contact").respond();
        //         $httpBackend.when("OPTIONS", "contact").respond();

        //         // $httpBackend.whenGET('http://localhost:6660/contact/2').respond([200, "", ""]);
        //         // $httpBackend.expectGET('http://localhost:6660/contact/2');
        //     });

        //     // it("restangular remove() should work", function(done) {
        //     //     $httpBackend.expectDELETE('http://localhost:6660/contact/2').respond([200, "", ""]);
        //     //     var res = Restangular.one('contact', 2).get();
        //     //     ContactsController.person = utils.resolvePromise(res, q, scope);
        //     //     done();
        //     //     $httpBackend.flush();
        //     // });
        // });


    });
    
})();