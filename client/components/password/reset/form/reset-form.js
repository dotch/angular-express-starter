angular.module('myApp.reset', [])
  .controller('ResetFormController', function($scope, $auth, $mdToast, Password, $stateParams) {
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
