angular.module('myApp', [
  'ngResource',
  'ngMessages',
  'ngMaterial',
  'ui.router',
  'satellizer',

  'myApp.signup',
  'myApp.profile',
  'myApp.login',
  'myApp.forgot',
  'myApp.reset',
  'myApp.logout',
  'myApp.home',

  'myApp.services',
  'myApp.directives'
])
  .config(function($stateProvider, $mdThemingProvider, $urlRouterProvider, $authProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('grey')

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html',
        controller: 'LoginController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'components/signup/signup.html',
        controller: 'SignupController'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutController'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'components/password/forgot/forgot.html',
        controller: 'ForgotController'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'components/password/reset/invalid/reset-invalid.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'components/password/reset/form/reset-form.html',
        controller: 'ResetFormController'
      })
      .state('profile', {
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

    $urlRouterProvider.otherwise('/');

    $authProvider.facebook({
      clientId: '1446453645668626'
    });

    $authProvider.google({
      clientId: '154995491013-9vuhtdo8drlfjql5eiesd36vm8c82i00.apps.googleusercontent.com'
    });

  });
