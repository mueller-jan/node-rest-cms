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
        function MainController($scope, $state, $filter, crudService) {
            console.log($scope.currentUser)
            crudService.getLayout().then(function(res) {
               $scope.layout = res.data;
                var toolbar =  $filter('filter')(res.data, {name: 'toolbar'})[0];
                console.log(toolbar)
                $scope.menuItems = toolbar.items[0].items;
                $state.go('main.page', {id: $scope.menuItems[0].slug});

            });

            //crudService.getMenu("56f67a391769df1419c7677d").then(function (res) {
            //    console.log(res)
            //    $scope.menuItems = res.data.items;
            //    if ($scope.menuItems.length > 0) {
            //        //TODO: startpage festlegen
            //
            //        $state.go('main.page', {id: $scope.menuItems[0].slug});
            //    }
            //});
        });




