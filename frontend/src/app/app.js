var app = angular.module('app', [
        'app.admin',
        'app.main',
        'ui.router',
        'ngMaterial',
        'services.crud'
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })

    .config(['$httpProvider', function ($httpProvider) {
        //Reset headers to avoid OPTIONS request (aka preflight)
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    }])

    .run(function run() {
    })

    .controller('AppCtrl', function AppCtrl($scope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
            }
        });
    });