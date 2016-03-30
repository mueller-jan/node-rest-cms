angular.module('app.admin', [
        'admin.pages-edit',
        'admin.pages-new',
        'admin.pages-list',
        'admin.menus-list',
        'admin.menus-edit',
        'ui.router',
        'app.config',
        'services.auth'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin', {
            url: '/admin',
            views: {
                "main": {
                    controller: 'AdminCtrl',
                    templateUrl: 'app/admin/admin.tpl.html'
                }
            },
            data: {
                pageTitle: 'admin'
            },
            resolve: {
                user: function ($q, authService) {
                    return authService.loginWithToken();

                }
            }
        })
    })


    .controller('AdminCtrl',
        function AdminController($scope, $state, user) {
        });


