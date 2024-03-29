angular.module('app.admin', [
        'admin.pages-edit',
        'admin.pages-new',
        'admin.pages-list',
        'admin.menus-list',
        'admin.menus-edit',
        'admin.menus-new',
        'admin.users-list',
        'admin.users-new',
        'admin.posts-list',
        'admin.posts-edit',
        'admin.posts-new',
        'admin.categories-list',
        'admin.categories-edit',
        'admin.categories-new',
        'admin.media',
        'ui.router'
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
            }
        })
    })

    .controller('AdminCtrl',
        function AdminController($scope, $state) {
        });


