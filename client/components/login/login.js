angular.module('myApp.login', [])

  .config( function( $stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'components/login/login.html',
      controller: 'LoginController'
    })
  })

  .controller('LoginController', function($scope, $mdToast, $auth) {
    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(loginSuccessHandler)
        .catch(loginErrorHandler);
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(loginSuccessHandler)
        .catch(loginErrorHandler);
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
      $mdToast.show(
        $mdToast.simple()
          .content(response.data ? response.data.message : response)
          .position('bottom right')
          .hideDelay(3000)
      );
    }
  });