angular.module('myApp.logout', [])
  .controller('LogoutController', function($auth, $mdToast) {
    if (!$auth.isAuthenticated()) {
      return;
    }
    $auth.logout()
      .then(function() {
        $mdToast.show(
          $mdToast.simple()
            .content('You have been logged out')
            .position('bottom right')
            .hideDelay(3000)
        );
      });
  });
