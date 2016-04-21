var app = angular.module('app', [
        'app.admin',
        'app.main',
        'ui.router',
        'services.crud',
        'services.auth',
        'services.error',
        'upload',
        'dndLists',
        'ngMaterial'
    ])

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .primaryPalette('indigo')
            .accentPalette('orange')
            .warnPalette('red');
    })


    .config(function appConfig($stateProvider, $urlRouterProvider) {
        // $urlRouterProvider.otherwise('/');
    })

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.interceptors.push('errorInterceptor');
    }])

    .controller('AppCtrl', function AppCtrl($scope, $rootScope, $window, $state, $mdDialog, $mdToast, $filter, crudService, authService, AUTH_EVENTS, SUCCESS_EVENTS) {
        $rootScope.$on("error", function(e, error) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent(error.data.message)
                    .ariaLabel('Alert Dialog')
                    .ok('OK')
            );
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
            $scope.openToast('Login success');
        });

        $rootScope.$on(SUCCESS_EVENTS.success, function (e, message) {
            $scope.openToast(message);
        });

        $scope.openToast = function(message) {
            $mdToast.show($mdToast.simple().textContent(message));
        };

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
            $scope.loading = true;
            if (toState.name.indexOf('admin') > -1) {
                $scope.showToolbar = false;
                if (!authService.isAuthenticated() || !authService.isAuthorized()) {
                    $state.transitionTo("main.login");
                    event.preventDefault();
                }
            } else {
                $scope.showToolbar = true;
            }
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $scope.loading = false;
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle;
            }
        });

        crudService.getConfiguration().then(function(res) {
            $scope.configuration = res.data;
        });
        
        
    });

