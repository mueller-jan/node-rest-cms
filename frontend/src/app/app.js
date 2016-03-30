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
            $state.go('main');
        };

        $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            console.log(authService)
            if (toState.name.indexOf('admin') > -1) {
                console.log("needs prot")
                console.log(!authService.isAuthenticated())
                console.log(!authService.isAuthorized())
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

