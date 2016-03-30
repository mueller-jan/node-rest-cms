var app = angular.module('app', [
        'app.admin',
        'app.main',
        'ui.router',
        'services.crud',
        'ngMaterial'
    ])

    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })

    .controller('AppCtrl', function AppCtrl($rootScope, $scope, $window) {
        var token = $window.localStorage.getItem('token');
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
        //$scope.setCurrentUser = function (user) {
        //    $scope.currentUser = user;
        //};

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle;
            }
        });

    })
    ;
