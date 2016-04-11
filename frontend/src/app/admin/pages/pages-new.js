angular.module('admin.pages-new', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.pages-new', {
            url: '/pages/new',
            views: {
                "content": {
                    controller: 'NewPagesCtrl',
                    templateUrl: 'app/admin/pages/pages-edit.tpl.html'
                }
            },
            data: {pageTitle: 'new page'}
        });
    })

    .controller('NewPagesCtrl',
        function NewPagesController($scope, $rootScope, $state, crudService, SUCCESS_EVENTS) {
            $scope.submit = function () {
                $scope.page.type = 'page';
                crudService.createPage($scope.page).then(function (res) {
                    if (res.data) {
                        $rootScope.$broadcast(SUCCESS_EVENTS.success, 'New Page created.');
                        $state.go('admin.pages-list');
                    }
                });
            };
        });




