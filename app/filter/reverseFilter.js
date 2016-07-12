/*global angular*/
(function () {
	'use strict';

	function filter() {
		return function (items) {
			return items.slice().reverse();
		};
	};
	var app = angular.module('app'),
		requires = [
        filter
      ];
	app.filter('reverse', requires);
}());