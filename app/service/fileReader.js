/*global angular*/
(function () {
  'use strict';

  function fileReader($http,$q) {
    
    var feeds;
    this.getFeed = function () {
       var def = $q.defer();
      $http({
        method: "GET",
        url: "data.json"
      }).success(function(response) {
         feeds = def.resolve(response);
      })
      .error(function() {
        def.reject("Failed to get albums");
      });
      
      return def.promise;
    }

  }
  var app = angular.module('app'),
    requires = [
        '$http',
        '$q',
        fileReader
      ];
  app.service('fileReader', requires);
}());