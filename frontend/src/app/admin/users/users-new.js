angular.module('admin.users-new', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.users-new', {
            url: '/users/new',
            views: {
                "content": {
                    controller: 'NewUserCtrl',
                    templateUrl: 'app/admin/users/users-edit.tpl.html'
                }
            },
            data: {pageTitle: 'new user'}
        });
    })

    .controller('NewUserCtrl',
        function NewUserController($scope, crudService) {
            $scope.submit = function () {
                console.log($scope.user);
                crudService.createUser($scope.user);
            };
        });




