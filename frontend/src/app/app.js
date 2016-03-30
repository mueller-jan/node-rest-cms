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



    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error, stateProvider) {
            if (angular.isObject(error) && angular.isString(error.code)) {
                console.log(error.code)
                switch (error.code) {

                    case 'NOT_AUTHENTICATED':
                        // go to the login page
                        $state.go('main.login');
                        break;
                    default:
                        // set the error object on the error state and go there
                        $state.get('error').error = error;
                        $state.go('login');
                }
            }
            else {
                // unexpected error
                console.log(error.code)
                $state.go('error');
            }
        });
    })

    .controller('AppCtrl', function AppCtrl($rootScope, $scope, $window, $state) {
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
