(function(){
    'use strict';

    angular.module('dgGmail').factory('settings', settings);

    settings.$inject = ['$location', 'mail', '$timeout'];
    function settings($location, mail, $timeout) {
        // default mailbox is 'inbox' and page - 1
        var box = 'Inbox';
        var page = 1;
        var mailsByPage = 20;
        activate();

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

        function activate() {
            if (!$location.search().box) {
                $location.search({box: 'Inbox', page: 1});
            } else {
                if (!$location.search().page) {
                    $location.search('page', 1);
                }
                box = $location.search().box;
                page = $location.search().page;
            }
        }

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
            $location.search('page', page);
        }

        function getMailsByPage() {
            return mailsByPage;
        }

        function setMailsByPage(amount) {
            mailsByPage = amount;
        }
    }
    
})();