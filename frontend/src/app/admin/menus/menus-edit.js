angular.module('admin.menus-edit', [
        'services.crud',
        'ui.router',
        'checklist-model'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.menus-edit', {
            url: '/menus/edit/:id',
            views: {
                "content": {
                    controller: 'EditMenusCtrl',
                    templateUrl: 'app/admin/menus/menus-edit.tpl.html'
                }
            },
            data: {pageTitle: 'admin.edit'}
        });
    })

    .controller('EditMenusCtrl',
        function EditMenusController($scope, $stateParams, crudService) {
            $scope.pageId = $stateParams.id;

            crudService.getPages().then(function (res) {
                $scope.pages = res.data;
            });

            crudService.getMenu($stateParams.id).then(function (res) {
                $scope.menu = res.data;
                $scope.menu.items = [];
            });

            $scope.submit = function () {
                crudService.updateMenu($scope.menu._id, $scope.menu);
            };
        });




