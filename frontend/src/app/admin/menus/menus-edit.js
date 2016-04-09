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
        function EditMenusController($scope, $stateParams, crudService, BASE_URL) {
            $scope.pageId = $stateParams.id;
            $scope.pagesToInclude = [];

            crudService.getPages().then(function (res) {
                $scope.pages = res.data;
            });

            crudService.getMenu($stateParams.id).then(function (res) {
                $scope.menu = res.data;
                $scope.menu.items = [];
            });

            $scope.submit = function () {
                console.log($scope.pagesToInclude)
                for (var i = 0; i < $scope.pagesToInclude.length; i++) {
                    $scope.menu.items.push({'title': $scope.pagesToInclude[i].title, 'path': BASE_URL + '#/page/' + $scope.pagesToInclude[i].slug});

                }
                console.log($scope.menu);
                crudService.updateMenu($scope.menu._id, $scope.menu);
            };
        });




