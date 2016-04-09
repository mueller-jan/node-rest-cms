angular.module('admin.categories-list', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.categories-list', {
            url: '/categories',
            views: {
                "content": {
                    controller: 'ListCategoriesCtrl',
                    templateUrl: 'app/admin/posts/categories-list.tpl.html'
                }
            },
            data: {pageTitle: 'admin.categories'}
        });
    })

    .controller('ListCategoriesCtrl',
        function ListCategoriesController($scope, crudService) {
            crudService.getCategories().then(function (res) {
               $scope.categories = res.data; 
            });
            
            crudService.getPages().then(function (res) {
                $scope.pages = res.data;
            });

            $scope.deletePage = function(id) {
                crudService.deletePage(id).then(function (res) {
                    crudService.getPages().then(function (res) {
                        $scope.pages = res.data;
                    });
                });
            }
        });




