angular.module('myApp.profile', [])
  .controller('ProfileController', function($scope, $auth, $mdToast, Account) {

    /**
     * Get user's profile information.
     */
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $scope.user = data;
        })
        .error(function(error) {
          showDefaultToast(error.message);
        });
    };

    /**
     * Update user's profile information.
     */
    $scope.updateProfile = function() {
      Account.updateProfile({
        displayName: $scope.user.displayName,
        email: $scope.user.email
      }).then(function() {
        showDefaultToast('Profile has been updated');
      });
    };

    /**
     * Update user's password.
     */
    $scope.changePassword = function() {
      Account.changePassword({
        oldPassword: $scope.oldPassword,
        newPassword: $scope.newPassword
      })
      .then(function() {
        showDefaultToast('Password has been changed');
      })
      .catch(function(response) {
        showDefaultToast(response.data ? response.data.message : 'Could not change password');
      });
    };

    /**
     * Link third-party provider.
     */
    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          showDefaultToast('You have successfully linked ' + provider + ' account');
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          showDefaultToast(response.data.message);
        });
    };

    /**
     * Unlink third-party provider.
     */
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          showDefaultToast('You have successfully unlinked ' + provider + ' account');
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          showDefaultToast(response.data ? response.data.message : 'Could not unlink ' + provider + ' account');
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

    $scope.getProfile();

  });