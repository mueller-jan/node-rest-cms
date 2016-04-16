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
        function EditPagesController($scope, crudService, API_URL) {
            $scope.imageUrls = [];
            crudService.getImageNames().then(function (res) {
                var names = res.data;
                for (var i = 0; i < names.length; i++) {
                    $scope.imageUrls.push(API_URL + '/uploads/images/' + names[i]);
                }
                console.log($scope.imageUrls)
            });
            
            $scope.upload = function() {
                crudService.uploadFile($scope.file);
            };
        });




