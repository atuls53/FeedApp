// Code goes here
(function () {
	'use strict';
	function feedController($scope, fileReader) {
		
		$scope.limit = 5;
		$scope.error;

		$scope.obj = {};
		$scope.feeds = [];
			
		$scope.loadMore = function () {
			$scope.limit = $scope.limit + 2;
				if ($scope.limit >= $scope.feeds.length) {
				$scope.hideload = true;
				
			}			
		}
		var storageItem = JSON.parse(localStorage.getItem("feeds"));
		if (storageItem) {
			$scope.feeds = storageItem;
		}


		fileReader.getFeed().then(function (response) {
				var i;
				var temp;
								for (i = 0; i < response.length; i++) {
									$scope.feeds.push(response[i]);
								 	localStorage.setItem("feeds", JSON.stringify($scope.feeds));
								}
			},
			function (data) {

			});

		$scope.saveData = function (obj) {
				if($scope.description || obj){				
						var img;
						if (obj) {
							img = obj.data;
						} else {
							img = '';
						}
						$scope.feeds.push({
							id: $scope.feeds.length,
							description: $scope.description,
							like: 0,
							comment: [],
							image: img
						});

						$scope.description = '';
						$scope.testFile = '';
					$scope.error = '';
						localStorage.setItem("feeds", JSON.stringify($scope.feeds));
				}
			else {
				$scope.error = "Please Add text or image in your post";
				
			}
		};

		$scope.likeFeed = function (feed) {
			var i;
			for (i = 0; i < $scope.feeds.length; i++) {
				if ($scope.feeds[i].id === feed) {
					$scope.feeds[i].like = $scope.feeds[i].like + 1;
					localStorage.setItem("feeds", JSON.stringify($scope.feeds));

				}

			}
		};
		$scope.commentFeed = function (feed) {
			var i;
			this.commentBox = !this.commentBox;
			$scope.postComment = function (feed) {
				var comment = this.comment;
				for (i = 0; i < $scope.feeds.length; i++) {
					if ($scope.feeds[i].id === feed) {
						$scope.feeds[i].comment.push(comment);
						localStorage.setItem("feeds", JSON.stringify($scope.feeds));

					}

				}

				this.comment = '';
			}

		}



	}
	var app = angular.module('app'),
		requires = [
    '$scope',
    'fileReader',
     feedController
];
//app.filter("reverse", function() {
//  return function(items) {
//    return items.slice().reverse();
//  };
//});
	app.controller('feedController', requires);
}());	