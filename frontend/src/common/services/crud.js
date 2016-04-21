angular.module('services.crud', ['app.config'])
    .factory('crudService', function ($http, API_URL) {
        return {
            getMenu: function (id) {
                return $http.get(API_URL + '/menus/' + id);
            },

            createMenu: function (menu) {
                return $http.post(API_URL + '/menus', menu, {headers: {'Content-Type': 'application/json'}});
            },

            getMenus: function () {
                return $http.get(API_URL + '/menus');
            },

            updateMenu: function (id, menu) {
                return $http.put(API_URL + '/menus/' + id, menu, {headers: {'Content-Type': 'application/json'}});
            },

            deleteMenu: function (id) {
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

            createCategory: function (category) {
                return $http.post(API_URL + '/categories', category, {headers: {'Content-Type': 'application/json'}});
            },

            getCategories: function () {
                return $http.get(API_URL + '/categories');
            },

            getCategory: function (id) {
                return $http.get(API_URL + /categories/ + id)
            },

            updateCategory: function (id, category) {
                return $http.put(API_URL + '/categories/' + id, category, {headers: {'Content-Type': 'application/json'}});
            },

            //ids can be an array or a string
            getPagesFromCategory: function (ids, startDate, endDate, limit) {
                ids = (ids.constructor === Array) ? '?ids=' + ids.toString() : '?ids=' + ids;
                startDate = startDate ? '&startDate=' + startDate : '';
                endDate = endDate ? '&endDate=' + endDate : '';
                limit = limit ? '&limit=' + limit : '';
                return $http.get(API_URL + '/pages/categories' + ids + startDate + endDate + limit);
            },

            getOldestPost: function () {
                return $http.get(API_URL + '/pages/oldest');
            },

            updatePage: function (id, page) {
                return $http.put(API_URL + '/pages/' + id, page, {headers: {'Content-Type': 'application/json'}});
            },

            deletePage: function (id) {
                return $http.delete(API_URL + '/pages/' + id);
            },

            createUser: function (user) {
                return $http.post(API_URL + '/users', user, {headers: {'Content-Type': 'application/json'}});
            },

            getUsers: function () {
                return $http.get(API_URL + '/users');
            },

            getConfiguration: function () {
                return $http.get(API_URL + '/configurations')
            },

            getImageUrls: function () {
                return $http.get(API_URL + '/images');
            },

            // uploadFile: function (data) {
            //     var fd = new FormData();
            //     fd.append('file', file);
            //     return $http.post(API_URL + '/upload', fd, {
            //         transformRequest: angular.identity,
            //         headers: {'Content-Type': undefined}
            //     })
            // }

            uploadFile: function (files) {
                // var fd = new FormData();
                // fd.append('file', file);
                // console.log("crud")
                //
                // var data = new FormData();
                // angular.forEach(files, function (value) {
                //     console.log(value)
                //     console.log(angular.toJson())
                //     data.append("files[]", value);
                // });
                //
                // console.log(data)


                // console.log(data)
                return $http.post(API_URL + '/upload', files, {
                    // transformRequest: function (files) {
                    //
                    //     var fd = new FormData();
                    //     angular.forEach(files, function (value, key) {
                    //         if (value instanceof FileList) {
                    //             if (value.length == 1) {
                    //                 fd.append(key, value[0]);
                    //             } else {
                    //                 angular.forEach(value, function (file, index) {
                    //                     fd.append(key + '_' + index, file);
                    //                 });
                    //             }
                    //         } else {
                    //             fd.append(key, value);
                    //         }
                    //     });
                    //     return fd;
                    // },

                    transformRequest: function (files) {
                        var formData = new FormData();
                        for (var i = 0; i < files.length; i++) {
                            //add each file to the form data and iteratively name them
                            formData.append("file" + i, files[i]);
                        }
                        return formData;
                    },

                    headers: {'Content-Type': undefined}
                })
            }


        }
    });
