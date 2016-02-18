(function(){
    'use strict';

    angular.module('dgGmail').factory('settings', settings);

    settings.$inject = [];
    function settings() {
        // default mailbox is 'inbox' and page - 1
        var box = 'Inbox';
        var page = 1;
        var mailsByPage = 20;

        var factory = {
            getBox: getBox,
            setBox: setBox,
            getPage: getPage,
            setPage: setPage,
            getMailsByPage: getMailsByPage,
            setMailsByPage: setMailsByPage
        };
        return factory;

        //////////////

        function getBox() {
            return box;
        }

        function setBox(boxName) {
            box = boxName;
        }

        function getPage() {
            return page;
        }

        function setPage(pageName) {
            page = pageName;
        }

        function getMailsByPage() {
            return mailsByPage;
        }

        function setMailsByPage(amount) {
            mailsByPage = amount;
        }
    }
    
})();