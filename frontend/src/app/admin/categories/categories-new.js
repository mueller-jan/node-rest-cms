angular.module('admin.categories-new', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.categories-new', {
            url: '/categories/new',
            views: {
                "content": {
                    controller: 'NewCategoriesCtrl',
                    templateUrl: 'app/admin/categories/categories-edit.tpl.html'
                }
            },
            data: {pageTitle: 'new menu'}
        });
    })

    .controller('NewCategoriesCtrl',
        function NewCategoriesController($scope, crudService) {
            // crudService.getCategory().then(function (res) {
            //     $scope.pages = res.data;
            // });

            $scope.submit = function () {
                // crudService.createMenu($scope.menu);
            };
        });




