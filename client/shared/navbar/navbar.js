angular.module('myApp.navbar', [])
  .controller('NavbarController', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  });