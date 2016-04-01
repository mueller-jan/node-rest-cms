angular.module('app.main', [
        'app.page',
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
        function MainController($scope, $state, crudService) {
            console.log($scope.currentUser)
            crudService.getMenu("56f67a391769df1419c7677d").then(function (res) {
                $scope.menuItems = res.data.items;
                if ($scope.menuItems.length > 0) {
                    //TODO: startpage festlegen
                    //$state.go('/page/' + $scope.menuItems[0].slug);
                }
            });
        });




