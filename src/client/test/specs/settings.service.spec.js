(function() {
    'use strict';

    describe('Settings service:', function() {
        
        beforeEach(module('dgGmail'));

        describe('Defaults and settings updates', function() {
            var settings;

            beforeEach(inject(function(_settings_) {
                settings = _settings_;
            }));

            it('should check default settings', function(done) {
                expect(settings.getBox()).toBe('Inbox');
                expect(settings.getPage()).toBe(1);
                expect(settings.getMailsByPage()).toBe(20);

                done();
            });

            it('should check settings updates', function(done) {
                settings.setBox('Sent');
                expect(settings.getBox()).toBe('Sent');

                settings.setPage(33);
                expect(settings.getPage()).toBe(33);

                settings.setMailsByPage(100);
                expect(settings.getMailsByPage()).toBe(100);

                done();
            });

        });


    });
    
})();