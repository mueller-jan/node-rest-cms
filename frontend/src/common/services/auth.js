angular.module('services.auth', [])
    .factory('authService', [
        '$http',
        '$rootScope',
        '$window',
        'userService',
        function ($http, $rootScope, $window, userService) {
            var that = this;
            var authService = {};
            authService.login = function (credentials) {
                return $http
                    .post('http://localhost:3000/login', credentials, {headers: {'Content-Type': 'application/json'}})
                    .then(function (res) {
                        $window.localStorage.setItem('token', res.data.token);
                        console.log(res.data);
                        console.log(userService)
                        userService.create(res.data.user.name, res.data.user.role);
                        return res.data.user;
                    })
            };

            authService.loginWithToken = function () {
                console.log("login with token")
                var token = $window.localStorage.getItem('token');
                return $http
                    .post('http://localhost:3000/token', null, {headers: {'x-access-token': token}})
                    .then(function (res) {
                        userService.create(res.data.user.name, res.data.user.role);
                        return res.data.user;
                    })
            };

            //weak authentication mechanism for client side
            //doesn't really matter since sensible data is protected on the server side
            authService.isAuthenticated = function () {
                return (userService.name && localStorage.getItem('token') !== null)
            };

            authService.isAuthorized = function () {
                console.log(userService.role);
                return (userService.name && (userService.role === 'admin'));
            };

            authService.logout = function () {
                userService.destroy();
                $window.localStorage.removeItem('token');
            };

            return authService;
        }])

    .service('userService', function () {
        this.create = function (name, role) {
            this.name = name;
            this.role = role;
        };
        this.destroy = function () {
            this.name = null;
            this.role = null;
        };
    });



