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
            data: {pageTitle: 'asdf'}
        });
    })

    .controller('PageCtrl',
        function PageController($scope, $stateParams, $sce, crudService) {
            crudService.getPage($stateParams.id).then(function (res) {
                $scope.page = res.data;
                $scope.page.content = $sce.trustAsHtml($scope.page.content);
                //$scope.toTrustedHTML = function(html){
                //    return $sce.trustAsHtml(html);
                //}
            });
        });