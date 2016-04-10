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
        function NewPostsController($scope, crudService) {
            $scope.submit = function () {
                $scope.page.type = 'post';
                crudService.createPage($scope.page).then(onSuccess, onError);
            };

            function onSuccess(data) {
            }
            function onError(data) {
            }
        });




