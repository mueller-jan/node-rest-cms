angular.module('services.crud', ['app.config'])
    .factory('crudService', function ($http, API_URL) {
        return {
            getMenu: function (id) {
                return $http.get(API_URL + '/menus/' + id);
            },

            getMenus: function() {
                return $http.get(API_URL + '/menus');
            },

            updateMenu: function(id, menu) {
                return $http.put(API_URL + '/menus/' + id, menu, {headers: {'Content-Type': 'application/json'}});
            },

            deleteMenu: function(id) {
                return $http.delete(API_URL + '/menus/' + id);
            },

            createPage: function (page) {
                return $http.post(API_URL + '/pages', page, {headers: {'Content-Type': 'application/json'}});
            },

            getPages: function () {
                return $http.get(API_URL + '/pages');
            },

            getPage: function (id) {
                return $http.get(API_URL + '/pages/' + id);
            },

            updatePage: function (id, page) {
                return $http.put(API_URL + '/pages/' + id, page, {headers: {'Content-Type': 'application/json'}});
            },

            deletePage: function(id) {
                return $http.delete(API_URL + '/pages/' + id);
            },

            createUser: function (user) {
                return $http.post(API_URL + '/users', user, {headers: {'Content-Type': 'application/json'}});
            },

            getUsers: function () {
                return $http.get(API_URL + '/users');
            }
        }
    });
