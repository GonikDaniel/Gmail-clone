(function() {
    'use strict';

    angular
        .module('calculator')
        .controller('CalcController', CalcController);

    CalcController.$inject = ['calcService'];

    /* @ngInject */
    function CalcController(calcService) {
        var vm = this;
        // initial values
        vm.currencies = {
            IN: 'USD',
            OUT: 'EUR'
        };
        vm.amount = 1;
        vm.result = 'RESULT';

        activate();

        ////////////////

        function activate() {
            calcService.getRates('USD').then(function(data) {
                calcService.setRatesCache('USD', data.rates);
            }, function(error) {
                console.log(error);
            });
        }

        vm.count = function() {
            // console.log(vm.currencies.IN, vm.currencies.IN.OUT, vm.amount)
            var base = vm.currencies.IN;
            var OUT = vm.currencies.OUT;
            var amount = vm.amount;
            if (base === OUT) {
                vm.result = amount;
                return;
            } else if (calcService.isCached(base)) {
                vm.result = calcService.count(base, OUT, amount);
            } else {
                calcService.getRates(base).then(function(data) {
                    calcService.setRatesCache(base, data.rates);
                    vm.result = calcService.count(base, OUT, amount);
                }, function(error) {
                    console.log(error);
                });
            }
        };
    }
})();