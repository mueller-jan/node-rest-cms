angular.module('app.admin', [
        'admin.pages-edit',
        'admin.pages-new',
        'admin.pages-list',
        'admin.menus-list',
        'admin.menus-edit',
        'ui.router',
        'app.config'
    ])

    .config(function config($stateProvider, USER_ROLES) {
        $stateProvider.state('admin', {
            url: '/admin',
            views: {
                "main": {
                    controller: 'AdminCtrl',
                    templateUrl: 'app/admin/admin.tpl.html'
                }
            },
            data: {
                pageTitle: 'admin',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        });
    })

    .controller('AdminCtrl',
        function AdminController($scope) {
        });




