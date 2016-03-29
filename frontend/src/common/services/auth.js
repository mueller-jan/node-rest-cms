angular.module('services.auth', [])
    .factory('authService', [
        '$http',
        '$rootScope',
        '$window',
        'sessionService',

        function ($http, $rootScope, $window, sessionService, AUTH_EVENTS, API_URL) {
            var that = this;
            var authService = {};
            authService.login = function (credentials) {
                return $http
                    .post('http://localhost:3000/authenticate', credentials, {headers: {'Content-Type': 'application/json'}})
                    .then(function (res) {
                        sessionService.create(res.data.token, res.data.user);
                        return res.data.user;
                    })
            };

            authService.loginWithToken = function (token) {
                return $http
                    .post('http://localhost:3000/token', null, {headers: {'x-access-token': token}})
                    .then(function (res) {
                        console.log(res)
                        sessionService.create(token, res.data.user);
                        return res.data.user;
                    })
            };

            authService.logout = function () {
                sessionService.destroy();
            };

            authService.isAuthenticated = function () {
                return !!sessionService.token;
            };

            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }

                return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(sessionService.user.role) !== -1);
            };

            return authService;
        }])

    .service('sessionService', function ($window) {
        this.create = function (token, user) {
            $window.localStorage.setItem('token', token);
            this.token = token;
            this.user = user;
        };
        this.destroy = function ($window) {
            $window.localStorage.removeItem('token');
            this.token = null;
            this.user = null;
        };
    });



