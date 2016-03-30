var app = angular.module('app', [
        'app.admin',
        'app.main',
        'ui.router',
        'services.crud',
        'services.auth',
        'ngMaterial'
    ])


    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })

    .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$location', '$injector', '$q', function ($location, $injector, $q) {
            return {
                request: function (req) {
                    //injected manually to get around circular dependency problem.
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


    .run(function ($state, authService) {

    })

    .controller('AppCtrl', function AppCtrl($scope, $rootScope, $window, $state, authService) {
        console.log("CONTROLLER")
        //var token = $window.localStorage.getItem('token');
        //authService.loginWithToken(token).then(function(data) {
        //    $scope.currentUser = data
        // });
        //
        //$scope.logout = function () {
        //    authService.logout();
        //    $scope.currentUser = null;
        //    $state.go('main');
        //};
        //
        //$scope.userRoles = USER_ROLES;
        ////$scope.isAuthorized = authService.isAuthorized;
        //

        $scope.currentUser = null;

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
            if (toState.name.indexOf('admin') > -1) {
                if (!authService.isAuthenticated() || !authService.isAuthorized()) {
                    $state.transitionTo("main.login");
                    event.preventDefault();
                }
            }
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle;
            }
        });
    });

