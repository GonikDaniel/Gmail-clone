(function() {
    'use strict';

    angular.module('dgGmail').factory('utils', utils);

    function utils() {
        var factory = {
            sanitizeRestangularOne: sanitizeRestangularOne,
            sanitizeRestangularAll: sanitizeRestangularAll
        };
        return factory;

        ////////////////

        function sanitizeRestangularOne(item) {
            return _.omit(item, "route", "parentResource", "getList", "get", "post", "put", "remove", "head", "trace", "options", "patch",
                "$get", "$save", "$query", "$remove", "$delete", "$put", "$post", "$head", "$trace", "$options", "$patch",
                "$then", "$resolved", "restangularCollection", "customOperation", "customGET", "customPOST",
                "customPUT", "customDELETE", "customGETLIST", "$getList", "$resolved", "restangularCollection", "one", "all", "doGET", "doPOST",
                "doPUT", "doDELETE", "doGETLIST", "addRestangularMethod", "getRestangularUrl", "restangularEtag", "reqParams",
                "getRequestedUrl", "clone", "withHttpConfig", "plain", "restangularized", "several", "oneUrl", "allUrl", "fromServer",
                "getParentList", "save");
        }

        function sanitizeRestangularAll(items) {
            var all = _.map(items, function(item) {
                return sanitizeRestangularOne(item);
            });
            return all;
        }

    }
    
})();