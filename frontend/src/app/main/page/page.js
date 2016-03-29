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
                    templateUrl: 'app/main/page/page.tpl.html'
                }
            },
            data: {pageTitle: 'asdf'}
        });
    })

    .controller('PageCtrl',
        function PageController($scope, $stateParams, crudService) {
            crudService.getPage($stateParams.id).then(function (res) {
                $scope.page = res.data;
            });
        });