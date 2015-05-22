angular.module('myApp.services', [])
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
  .factory('Password', function($http) {
    return {
      forgotPassword: function(emailData) {
        return $http.post('/auth/forgot', emailData);
      },
      resetPassword: function(token, passwordData) {
        return $http.post('/auth/reset/' + token, passwordData);
      }
    }
  });