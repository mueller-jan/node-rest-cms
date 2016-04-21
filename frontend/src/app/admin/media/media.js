angular.module('admin.media', [
        'services.crud',
        'upload',
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

            $scope.uploadPath = API_URL + '/upload'

            crudService.getImageUrls().then(function (res) {
                $scope.imageUrls = res.data;
            });

            $scope.deleteImage = function(url) {
                crudService.deleteImage(url).then(function() {
                    crudService.getImageUrls().then(function (res) {
                        $scope.imageUrls = res.data;
                    });
                })
            };


            $scope.submit = function () {
                crudService.uploadFile($scope.files).then(function (res) {
                    if (res.data) {
                        $scope.loading = false;
                        $scope.files = [];
                        crudService.getImageUrls().then(function (res) {
                            $scope.imageUrls = res.data;
                        });
                    }
                });
            };

        });




