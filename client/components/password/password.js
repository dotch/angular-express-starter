angular.module('myApp.password', [
  'myApp.password.forgot',
  'myApp.password.reset'
])

  .config( function( $stateProvider) {
    $stateProvider.state('password', {
      abstract: true,
      url: '/password',
      template: '<ui-view/>'
    })
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
