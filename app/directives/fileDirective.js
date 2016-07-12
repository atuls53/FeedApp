(function () {
    'use strict';
    angular.module('ng-file-model', [])
    .directive("ngFileModel", [function () {
        return {
            scope: {
                ngFileModel: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.ngFileModel = {
                                data: loadEvent.target.result
                            };
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
    if( typeof exports !== 'undefined' ) {
      exports['default'] = angular.module('ng-file-model');
      module.exports = exports['default'];
    }
})();