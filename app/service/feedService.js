/*global angular*/
(function () {
  'use strict';

  function feedService($q) {
    
    var feeds;		
		
    this.getFeed = function () {
       var def = $q.defer();
				feeds = JSON.parse(localStorage.getItem("feeds"));
				if(feeds)
				{
					 feeds = def.resolve(feeds);
				}
				else {
					 def.reject("Failed to get albums");
				}
			return def.promise;
    
    }

  }
  var app = angular.module('app'),
    requires = [
        '$q',
        feedService
      ];
  app.service('feedService', requires);
}());