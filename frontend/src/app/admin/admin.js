angular.module('app.admin', [
        'admin.pages-edit',
        'admin.pages-new',
        'admin.pages-list',
        'admin.menus-list',
        'admin.menus-edit',
        'ui.router',
        'app.config',
        'services.auth'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin', {
            url: '/admin',
            views: {
                "main": {
                    controller: 'AdminCtrl',
                    templateUrl: 'app/admin/admin.tpl.html'
                }
            },
            data: {
                pageTitle: 'admin'
            },
            resolve: {authenticate: authenticate}
        });
        function authenticate($q, $state, $timeout, authService) {
            console.log("auth")
            var a = authService.authenticate();
            console.log(a)
            if (a) {

                // Resolve the promise successfully
                return $q.when()
            } else {
                // The next bit of code is asynchronously tricky.
                $timeout(function () {
                    // This code runs after the authentication promise has been rejected.
                    // Go to the log-in page
                    console.log("goto main page")
                    $state.go('main.login')
                });

                // Reject the authentication promise to prevent the state from loading
                return $q.reject()
            }
        }
    })

    .controller('AdminCtrl',
        function AdminController($scope) {
        });


