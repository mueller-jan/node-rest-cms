angular.module('app.page', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('main.page', {
            url: '^/page/:id',
            views: {
                "page-content": {
                    controller: 'PageCtrl',
                    templateUrl: 'app/public/page/page.tpl.html'
                }
            },
            data: {pageTitle: 'page'},
            resolve: {
                page: function (crudService, $stateParams) {
                    return crudService.getPage($stateParams.id)
                }
            }
        });
    })

    .controller('PageCtrl',
        function PageController($scope, $stateParams, $sce, page) {
                $scope.page = page.data;
                $scope.page.content = $sce.trustAsHtml($scope.page.content);
        });