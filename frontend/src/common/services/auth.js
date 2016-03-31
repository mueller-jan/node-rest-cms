angular.module('services.auth', [])
    .factory('authService', [
        '$http',
        '$rootScope',
        '$window',
        'userService',
        'tokenService',
        function ($http, $rootScope, $window, userService, tokenService) {
            var authService = {};
            authService.login = function (credentials) {
                return $http
                    .post('http://localhost:3000/login', credentials, {headers: {'Content-Type': 'application/json'}})
                    .then(function (res) {
                        tokenService.save(res.data.token);
                        userService.create(res.data.user.name, res.data.user.role);
                        return res.data.user;
                    })
            };

            authService.loginWithToken = function () {
                var token = tokenService.load();
                console.log(token)
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
                return (userService.name && tokenService.load() !== null)
            };

            authService.isAuthorized = function () {
                return (userService.name && (userService.role === 'admin'));
            };

            authService.logout = function () {
                userService.destroy();
                tokenService.remove();
            };

            authService.getToken = function () {
                return tokenService.load();
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
    })
    .factory('tokenService', function () {
        var storageKey = 'token';
        return {
            save: function (token) {
                return localStorage.setItem(storageKey, token);
            },
            load: function () {
                return localStorage.getItem(storageKey);
            },
            remove: function () {
                return localStorage.removeItem(storageKey);
            }
        }
    });






