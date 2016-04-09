angular.module('admin.posts-list', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.posts-list', {
            url: '/posts',
            views: {
                "content": {
                    controller: 'ListPostsCtrl',
                    templateUrl: 'app/admin/posts/posts-list.tpl.html'
                }
            },
            data: {pageTitle: 'admin.posts'}
        });
    })

    .controller('ListPostsCtrl',
        function ListPostsController($scope, crudService) {
            crudService.getPages('?type=post').then(function (res) {
                $scope.posts = res.data;
            });

            $scope.deletePage = function(id) {
                crudService.deletePage(id).then(function (res) {
                    crudService.getPages().then(function (res) {
                        $scope.pages = res.data;
                    });
                });
            }
        });




