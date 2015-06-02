angular.module('myApp.profile', [])

  .config( function( $stateProvider) {
    $stateProvider.state('profile', {
      url: '/profile',
      templateUrl: 'components/profile/profile.html',
      controller: 'ProfileController',
      resolve: {
        authenticated: function($q, $location, $auth) {
          var deferred = $q.defer();

          if (!$auth.isAuthenticated()) {
            $location.path('/login');
          } else {
            deferred.resolve();
          }

          return deferred.promise;
        }
      }
    });
  })

  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/api/users/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/users/me', profileData);
      }
    };
  })

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
        email: $scope.user.email,
        newPassword: $scope.user.newPassword,
        oldPassword: $scope.user.oldPassword
      })
      .then(function() {
        showDefaultToast('Profile has been updated');
        $scope.getProfile();
      })
      .catch(function(response) {
        showDefaultToast(response.data.message);
        $scope.getProfile();
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