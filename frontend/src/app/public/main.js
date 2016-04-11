angular.module('app.main', [
        'app.page',
        'app.category',
        'app.login',
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('main', {
            url: '/',
            views: {
                "main": {
                    controller: 'MainCtrl',
                    templateUrl: 'app/public/main.tpl.html'
                }
            },
            data: {pageTitle: 'main'}
        });
    })

    .controller('MainCtrl',
        function MainController($scope, $state, $filter, crudService) {
            crudService.getLayout().then(function(res) {
               $scope.layout = res.data;
                var toolbar =  $filter('filter')(res.data, {name: 'toolbar'})[0];
                $scope.menu = toolbar.items[0].items;
            });
        });




