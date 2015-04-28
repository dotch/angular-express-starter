angular.module('myApp.signup', [])
  .controller('SignupController', function($scope, $mdToast, $auth) {
    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password
      }).catch(function(response) {
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            $mdToast.show(
              $mdToast.simple()
                .content(message[0])
                .position('bottom right')
                .hideDelay(3000)
            );
          });
        } else {
          $mdToast.show(
            $mdToast.simple()
              .content(response.data.message)
              .position('bottom right')
              .hideDelay(3000)
          );
        }
      });
    };
  });