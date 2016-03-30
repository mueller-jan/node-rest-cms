angular.module('admin.pages-new', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.pages-new', {
            url: '/pages/new/:id',
            views: {
                "content": {
                    controller: 'NewPagesCtrl',
                    templateUrl: 'app/admin/pages/pages-edit.tpl.html'
                }
            },
            data: {pageTitle: 'pages.new'},
            resolve: {
                user: function ($q, authService) {
                    return authService.loginWithToken();
                }
            }
        });
    })

    .controller('NewPagesCtrl',
        function NewPagesController($scope, crudService, user) {
            $scope.submit = function () {
                crudService.createPage($scope.page);
            };
        });




