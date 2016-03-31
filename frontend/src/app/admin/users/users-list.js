angular.module('admin.users-list', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.users-list', {
            url: '/users',
            views: {
                "content": {
                    controller: 'ListUsersCtrl',
                    templateUrl: 'app/admin/users/users-list.tpl.html'
                }
            },
            data: {pageTitle: 'admin.users'}
        });
    })

    .controller('ListUsersCtrl',
        function ListUsersController($scope, crudService) {
            crudService.getUsers().then(function (res) {
                $scope.users = res.data;
            });
        });




