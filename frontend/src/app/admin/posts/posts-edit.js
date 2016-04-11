angular.module('admin.posts-edit', [
        'services.crud',
        'textAngular',
        'file-model',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.posts-edit', {
            url: '/posts/edit/:id',
            views: {
                "content": {
                    controller: 'EditPostsCtrl',
                    templateUrl: 'app/admin/posts/posts-edit.tpl.html'
                }
            },
            data: {pageTitle: 'admin.posts-edit'}
        });
    })

    .controller('EditPostsCtrl',
        function EditPostsController($scope, $rootScope, $state, $stateParams, crudService, SUCCESS_EVENTS) {
            $scope.pageId = $stateParams.id;
            $scope.selectedCategories = [];

            crudService.getPage($scope.pageId).then(function (res) {
                $scope.page = res.data;
            });

            crudService.getCategories().then(function (res) {
                $scope.categories = res.data;
            });

            $scope.submit = function () {
                crudService.updatePage($scope.page._id, $scope.page).then(function (res) {
                    if (res.data) {
                        $rootScope.$broadcast(SUCCESS_EVENTS.success, 'Post updated.');
                        $state.go('admin.posts-list');
                    }
                });
            };
        });

