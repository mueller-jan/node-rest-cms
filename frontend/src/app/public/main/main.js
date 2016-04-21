angular.module('app.main', [
        'app.page',
        'app.category',
        'app.login',
        'app.archive',
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('main', {
            url: '/',
            views: {
                "main": {
                    templateUrl: 'app/public/main.tpl.html'
                },

                "page-content@main": {
                    controller: 'MainCtrl',
                    templateUrl: 'app/public/main/page.tpl.html'
                }
            },
            data: {pageTitle: 'main'}
        });
    })

    .controller('MainCtrl',
        function MainController($scope, $stateParams, crudService) {
            crudService.getPage($scope.configuration.frontpage).then(function (res) {
                $scope.page = res.data;
            })
        });



