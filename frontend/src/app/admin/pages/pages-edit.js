angular.module('admin.pages-edit', [
        'services.crud',
        'textAngular',
        'file-model',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.pages-edit', {
            url: '/pages/edit/:id',
            views: {
                "content": {
                    controller: 'EditPagesCtrl',
                    templateUrl: 'app/admin/pages/pages-edit.tpl.html'
                }
            },
            data: {pageTitle: 'admin.edit'}
        });
    })

    .controller('EditPagesCtrl',
        function EditPagesController($scope, $stateParams, crudService) {
            $scope.pageId = $stateParams.id;

            crudService.getPage($scope.pageId).then(function (res) {
                $scope.page = res.data;
            });

            crudService.getMenus().then(function (res) {
                $scope.menus = res.data;
            });

            $scope.submit = function () {
                crudService.updatePage($scope.page._id, $scope.page);
            };
        });

