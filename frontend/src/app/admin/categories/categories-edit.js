angular.module('admin.categories-edit', [
        'services.crud',
        'file-model',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.categories-edit', {
            url: '/categories/edit/:id',
            views: {
                "content": {
                    controller: 'EditCategoriesCtrl',
                    templateUrl: 'app/admin/categories/categories-edit.tpl.html'
                }
            },
            data: {pageTitle: 'admin.edit'}
        });
    })

    .controller('EditCategoriesCtrl',
        function EditCategoriesController($scope, $rootScope, $state, $stateParams, crudService, SUCCESS_EVENTS) {
            $scope.categoryId = $stateParams.id;

            crudService.getPages('?type=post').then(function (res) {
                $scope.pages = res.data;
            });

            crudService.getCategory($scope.categoryId).then(function (res) {
                $scope.category = res.data;
            });

            $scope.submit = function () {
                crudService.updateCategory($scope.category._id, $scope.category).then(function (res) {
                    if (res.data) {
                        $rootScope.$broadcast(SUCCESS_EVENTS.success, 'Category updated.');
                        $state.go('admin.categories-list');
                    }
                });
            };
        });

