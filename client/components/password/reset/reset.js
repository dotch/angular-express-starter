angular.module('myApp.password.reset', [])

  .config( function( $stateProvider) {
    $stateProvider.state('password.reset', {
      abstract: true,
      url: '/reset',
      template: '<ui-view/>'
    })
    .state('password.reset.invalid', {
      url: '/invalid',
      templateUrl: 'components/password/reset/invalid.html'
    })
    .state('password.reset.form', {
      url: '/:token',
      templateUrl: 'components/password/reset/form.html',
      controller: 'ResetController'
    });
  })

  .controller('ResetController', function($scope, $auth, $mdToast, Password, $stateParams) {
    $scope.reset = function() {
      Password.resetPassword($stateParams.token, { 'password': $scope.password })
        .then(function(token) {
          showDefaultToast('Password has been updated');
          $auth.setToken(token, true);
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


