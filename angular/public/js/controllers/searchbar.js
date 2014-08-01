'use strict';

angular.module('contactoApp')
  .controller('SearchbarCtrl', function ($rootScope, $scope, $http, $location, $routeParams) {

    $scope.keyword = "";

    $scope.search = function(event) {
      if (event.keyCode === 13 && $scope.keyword != "") {
        $location.path('/customers/search/' + $scope.keyword);
      }
    };

  });