(function(){
    'use strict';

    angular.module('dgGmail').factory('settings', settings);

    settings.$inject = ['$location', '$timeout', '$state', '$stateParams'];
    function settings($location, $timeout, $state, $stateParams) {
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
            if (!$stateParams.box) {
                $stateParams.box = 'Inbox';
                $stateParams.page = 1;
                $state.go('mail', $stateParams);
            } else {
                if (!$stateParams.page) {
                    $state.go('mail', { page : 1 });
                }
                box = $stateParams.box;
                page = $stateParams.page;
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
            $state.go('mail', { box: box, page : page });
        }

        function getMailsByPage() {
            return mailsByPage;
        }

        function setMailsByPage(amount) {
            mailsByPage = amount;
        }
    }
    
})();