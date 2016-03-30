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
                    templateUrl: 'app/main/login/login.tpl.html'
                }
            },
            data: {pageTitle: 'asdf'}
        });
    })

    .controller('LoginCtrl',
        function LoginController($scope, $rootScope, AUTH_EVENTS, authService) {
            $scope.credentials = {
                username: '',
                password: ''
            };

            $scope.login = function (credentials) {
                authService.login(credentials).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //$scope.setCurrentUser(user);
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            };

        });



