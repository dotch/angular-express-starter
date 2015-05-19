angular.module('myApp', [
  'ngResource',
  'ngMessages',
  'ui.router',
  'ngMaterial',
  'satellizer',

  'myApp.signup',
  'myApp.profile',
  'myApp.login',
  'myApp.logout',
  'myApp.home',

  'myApp.services',
  'myApp.directives'
])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
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
