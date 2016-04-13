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
                }
            },
            data: {pageTitle: 'main'}
        });
    });





