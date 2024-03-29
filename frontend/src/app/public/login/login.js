angular.module('app.login', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('main.login', {
            url: '^/login',
            views: {
                "page-content": {
                    controller: 'LoginCtrl',
                    templateUrl: 'app/public/login/login.tpl.html'
                }
            },
            data: {pageTitle: 'login'}
        });
    })

    .controller('LoginCtrl',
        function LoginController($scope, $rootScope, $state, AUTH_EVENTS, authService) {
            $scope.credentials = {
                username: '',
                password: ''
            };

            $scope.login = function (credentials) {
                authService.login(credentials).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);
                    $state.go('admin')
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            };

        });



