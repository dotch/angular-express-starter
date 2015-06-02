angular.module('myApp.signup', [])

  .config( function( $stateProvider) {
    $stateProvider.state('signup', {
      url: '/signup',
      templateUrl: 'components/signup/signup.html',
      controller: 'SignupController'
    })
  })

  .controller('SignupController', function($scope, $mdToast, $auth) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(loginSuccessHandler)
        .catch(loginErrorHandler);
    };

    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password
      }).catch(loginErrorHandler);
    };

    function loginSuccessHandler() {
      $mdToast.show(
        $mdToast.simple()
          .content('You have successfully logged in')
          .position('bottom right')
          .hideDelay(3000)
      );
    }

    function loginErrorHandler(response) {
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
            .content(response.data ? response.data.message : response)
            .position('bottom right')
            .hideDelay(3000)
        );
      }
    }
  });
