angular.module('admin.media', [
        'services.crud',
        'file-model',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.media', {
            url: '/media',
            views: {
                "content": {
                    controller: 'MediaCtrl',
                    templateUrl: 'app/admin/media/media.tpl.html'
                }
            },
            data: {pageTitle: 'media'}
        });
    })

    .controller('MediaCtrl',
        function EditPagesController($scope, crudService) {
            $scope.upload = function() {
                crudService.uploadFile($scope.file);
            };
        });




