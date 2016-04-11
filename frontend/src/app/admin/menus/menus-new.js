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
        function NewMenusController($scope, $rootScope, $state, crudService, SUCCESS_EVENTS) {
            crudService.getPages().then(function (res) {
                $scope.pages = res.data;
            });

            crudService.getCategories().then(function (res) {
                $scope.categories = res.data;
            });

            $scope.submit = function () {
                crudService.createMenu($scope.menu).then(function (res) {
                    if (res.data) {
                        $rootScope.$broadcast(SUCCESS_EVENTS.success, 'Menu created.');
                        $state.go('admin.menus-list');
                    }
                });
            };
        });



