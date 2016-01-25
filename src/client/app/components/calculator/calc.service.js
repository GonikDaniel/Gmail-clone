(function() {
    'use strict';

    angular
        .module('calculator')
        .factory('calcService', calcService);

    calcService.$inject = ['$http'];

    /* @ngInject */
    function calcService($http) {
        var ratesCache = {};
        var service = {
            getRates: getRates,
            setRatesCache: setRatesCache,
            isCached: isCached,
            count: count
        };

        return service;

        ////////////////

        function getRates(base) {
            return $http.get('https://api.fixer.io/latest?base=' + base).then(function(response) {
                return response.data;
            }, function(error) {
                console.log(error);
            });
        }

        function setRatesCache(base, rates) {
            ratesCache[base] = rates;
        }

        function isCached(base) {
            return !!ratesCache[base];
        }

        function count(IN, OUT, amount) {
            if (ratesCache[IN] && ratesCache[IN][OUT]) {
                return ratesCache[IN][OUT] * amount;
            }
        }
    }
})();