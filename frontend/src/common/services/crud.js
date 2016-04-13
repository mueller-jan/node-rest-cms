angular.module('services.crud', ['app.config'])
    .factory('crudService', function ($http, API_URL) {
        return {
            getMenu: function (id) {
                return $http.get(API_URL + '/menus/' + id);
            },

            createMenu: function(menu) {
                return $http.post(API_URL + '/menus', menu, {headers: {'Content-Type': 'application/json'}});
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

            getPages: function (params) {
                params = params || '';
                return $http.get(API_URL + '/pages' + params);
            },

            getPage: function (id) {
                return $http.get(API_URL + '/pages/' + id);
            },

            createCategory: function(category) {
                return $http.post(API_URL + '/categories', category, {headers: {'Content-Type': 'application/json'}});
            },

            getCategories: function() {
                return $http.get(API_URL + '/categories');
            },

            getCategory: function(id) {
                return $http.get(API_URL + /categories/ + id)
            },

            updateCategory: function (id, category) {
                return $http.put(API_URL + '/categories/' + id, category, {headers: {'Content-Type': 'application/json'}});
            },

            getPagesFromCategory: function(id) {
                return $http.get(API_URL + '/pages/categories/' + id);
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
            },

            getConfiguration: function() {
                return $http.get(API_URL + '/configurations')
            },

            uploadFile: function(file) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(API_URL + '/upload', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            }


        }
    });
