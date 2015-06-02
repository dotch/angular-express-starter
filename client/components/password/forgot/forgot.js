angular.module('myApp.password.forgot', [])

  .config( function( $stateProvider) {
    $stateProvider  .state('password.forgot', {
      url: '/forgot',
      templateUrl: 'components/password/forgot/forgot.html',
      controller: 'ForgotController'
    })
  })

  .controller('ForgotController', function($scope, $mdToast, Password) {
    $scope.forgot = function() {
      Password.forgotPassword({ 'email': $scope.email })
        .then(function() {
          showDefaultToast('Email has been sent');
        })
        .catch(function(response) {
          showDefaultToast(response.data.message);
        });
    };

    function showDefaultToast(message) {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position('bottom right')
          .hideDelay(3000)
      );
    }

  });
