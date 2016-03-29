var app = angular.module('app', [
        'app.admin',
        'app.main',
        'ui.router',
        'services.crud',
        'services.auth',
        'ngMaterial'
    ])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('tokenInterceptor');
            }
        ]);
    })


    .factory('tokenInterceptor', function ($q, $rootScope, sessionService) {
        return {
            request: function (request) {
                var token = sessionService.token;
                if (token) {
                    request.headers['x-access-token'] = token;
                }
                return request;
            },

            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })

    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })

    .run(function ($rootScope, $state, AUTH_EVENTS, authService) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
                var authorizedRoles = next.data.authorizedRoles;
                if (authorizedRoles) {
                    //authorization required
                    if (!authService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        if (authService.isAuthenticated()) {
                            // user is not allowed
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else {
                            // user is not logged in
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }
                    }
                    $state.go('main.login');
                }
            }
        );
    })

    .controller('AppCtrl', function AppCtrl($rootScope, $scope, $window, $state, USER_ROLES, authService, sessionService) {
        var token = $window.localStorage.getItem('token');
       //authService.loginWithToken(token).then(function(data) {
       //    $scope.currentUser = data
       // });

        $scope.logout = function () {
            authService.logout();
            $scope.currentUser = null;
            $state.go('main');
        };

        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = authService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle;
            }
        });

    })
    ;
