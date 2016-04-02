var app = angular.module('app', [
        'app.admin',
        'app.main',
        'ui.router',
        'services.crud',
        'services.auth',
        'ngMaterial'
    ])

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .primaryPalette('indigo')
            .accentPalette('orange')
            .warnPalette('red')

    })


    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['$location', '$injector', '$q', function ($location, $injector, $q) {
            return {
                request: function (req) {
                    //injected manually to get around circular dependency problem ($http).
                    var authService = $injector.get('authService');

                    var token = authService.getToken();
                    if (token) {
                        req.headers['x-access-token'] = token;
                    }
                    return req;
                }
            }
        }])
    }])

    .controller('AppCtrl', function AppCtrl($scope, $rootScope, $window, $state, authService, crudService) {
        $scope.currentUser = null;

        authService.loginWithToken().then(function (data) {
            $scope.currentUser = data
        });

        $scope.isAuthorized = authService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

        $scope.logout = function () {
            authService.logout();
            $scope.currentUser = null;
            $state.go('main');
        };

        $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.resolve) {
                $scope.showProgress = true;
            }
            if (toState.name.indexOf('admin') > -1) {
                if (!authService.isAuthenticated() || !authService.isAuthorized()) {
                    $state.transitionTo("main.login");
                    event.preventDefault();
                }
            }
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (toState.resolve) {
                $scope.showProgress = false;
            }
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle;
            }
        });
    });

