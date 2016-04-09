angular.module('app.category', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('main.category', {
            url: '^/category/:id',
            views: {
                "page-content": {
                    controller: 'CategoryCtrl',
                    templateUrl: 'app/public/category/category.tpl.html'
                }
            },
            data: {pageTitle: 'category'},
            resolve: {
                pages: function (crudService, $stateParams) {
                    return crudService.getPagesFromCategory($stateParams.id)
                }
            }
        });
    })

    .controller('CategoryCtrl',
        function CategoryController($scope, $stateParams, $sce, pages) {
            $scope.pages = pages.data.pages;
            console.log($scope.pages)
            angular.forEach($scope.pages, function(page) {
                console.log(page)
                page.content = $sce.trustAsHtml(page.content);
            });
                // $scope.pages = page.data;
                // $scope.page.content = $sce.trustAsHtml($scope.page.content);
        });