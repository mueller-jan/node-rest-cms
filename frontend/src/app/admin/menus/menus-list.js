angular.module('admin.menus-list', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.menus-list', {
            url: '/menus',
            views: {
                "content": {
                    controller: 'ListMenusCtrl',
                    templateUrl: 'app/admin/menus/menus-list.tpl.html'
                }
            },
            data: {pageTitle: 'admin.menus'}
        });
    })

    .controller('ListMenusCtrl',
        function ListMenusController($scope, crudService) {
            crudService.getMenus().then(function (res) {
                $scope.menus = res.data;
            });

            $scope.deletePage = function(id) {
                crudService.deletePage(id).then(function () {
                    crudService.getMenus().then(function (res) {
                        $scope.menus = res.data;
                    });
                });
            }
        });




