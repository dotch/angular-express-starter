angular.module('myApp', [
  'ngResource',
  'ngMessages',
  'ngMaterial',
  'ui.router',
  'satellizer',

  'myApp.navbar',
  'myApp.passwordMatch',

  'myApp.signup',
  'myApp.profile',
  'myApp.login',
  'myApp.password',
  'myApp.logout',
  'myApp.home'
])

  .config(function($stateProvider, $mdThemingProvider, $urlRouterProvider, $authProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('grey');

    $urlRouterProvider.otherwise('/home');

    $authProvider.facebook({
      clientId: '1446453645668626'
    });

    $authProvider.google({
      clientId: '154995491013-9vuhtdo8drlfjql5eiesd36vm8c82i00.apps.googleusercontent.com'
    });

  });
