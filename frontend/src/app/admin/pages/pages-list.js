angular.module('admin.pages-list', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.pages-list', {
            url: '/pages',
            views: {
                "content": {
                    controller: 'ListPagesCtrl',
                    templateUrl: 'app/admin/pages/pages-list.tpl.html'
                }
            },
            data: {pageTitle: 'admin.pages'}
        });
    })

    .controller('ListPagesCtrl',
        function ListPagesController($scope, crudService) {
            crudService.getPages().then(function (res) {
                $scope.pages = res.data;
            });

            $scope.deletePage = function(id) {
                crudService.deletePage(id);
            }
        });




