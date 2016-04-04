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
        function NewPagesController($scope, crudService) {
            $scope.submit = function () {
                crudService.createPage($scope.page).then(onSuccess, onError);
            };

            function onSuccess(data) {
            }
            function onError(data) {
            }
        });




