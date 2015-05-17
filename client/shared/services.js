angular.module('myApp.services', [])
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/api/user/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/user/me', profileData);
      }
    };
  });