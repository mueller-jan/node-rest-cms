angular.module('admin.menus-new', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.menus-new', {
            url: '/menus/new',
            views: {
                "content": {
                    controller: 'NewMenusCtrl',
                    templateUrl: 'app/admin/menus/menus-edit.tpl.html'
                }
            },
            data: {pageTitle: 'new menu'}
        });
    })

    .controller('NewMenusCtrl',
        function NewMenusController($scope, crudService) {
            crudService.getPages().then(function (res) {
                $scope.pages = res.data;
            });

            crudService.getCategories().then(function (res) {
                $scope.categories = res.data;
            });

            $scope.submit = function () {
                crudService.createMenu($scope.menu);
            };
        });




