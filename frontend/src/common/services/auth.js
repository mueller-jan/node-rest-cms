angular.module('services.auth', [])
    .factory('authService', [
        '$http',
        '$rootScope',
        '$window',
        '$q',

        function ($http, $rootScope, $window, $q) {
            var authService = {};
            var that = this;
            authService.login = function (credentials) {
                return $http
                    .post('http://localhost:3000/login', credentials, {headers: {'Content-Type': 'application/json'}})
                    .then(function (res) {
                        //userService.create(res.data.token, res.data.user);
                        $window.localStorage.setItem('token', res.data.token);
                        console.log(res.data.token)
                        return res.data.user;
                    })
            };

            authService.isAuthenticated = function (success, error) {
                return $http.post('http://localhost:3000/authenticate')
                    .success(function (user) {
                    console.log("success")
                    success(user);
                }).error(error);
            };

            authService.loginWithToken = function () {
                var token = localStorage.getItem('token');
                return $http
                    .post('http://localhost:3000/token', null, {headers: {'x-access-token': token}})
                    .then(function (res) {
                        //$window.localStorage.setItem('token', token);
                        //userService.create(token, res.data.user);
                        return res.data.user;

                    })
            };

            authService.logout = function () {
                $window.localStorage.removeItem('token');
            };

            return authService;
        }]);



