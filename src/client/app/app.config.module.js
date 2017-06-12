(function() {
	'use strict';

	angular.module('app.config', [])
    .constant('production', {"ENV":{"api":"https://gmail-clone.herokuapp.com/","development":false}})
    .constant('development', {"ENV":{"api":"http://localhost:6660/","development":true}});

})();