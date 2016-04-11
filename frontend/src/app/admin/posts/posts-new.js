angular.module('admin.posts-new', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.posts-new', {
            url: '/posts/new',
            views: {
                "content": {
                    controller: 'NewPostsCtrl',
                    templateUrl: 'app/admin/posts/posts-edit.tpl.html'
                }
            },
            data: {pageTitle: 'new post'}
        });
    })

    .controller('NewPostsCtrl',
        function NewPostsController($scope, $rootScope, crudService, SUCCESS_EVENTS) {
            $scope.submit = function () {
                $scope.page.type = 'post';
                crudService.createPage($scope.page).then(function (res) {
                    if (res.data) {
                        $rootScope.$broadcast(SUCCESS_EVENTS.success, 'Post created.');
                        $state.go('admin.posts-list');
                    }
                });
            };
        });




