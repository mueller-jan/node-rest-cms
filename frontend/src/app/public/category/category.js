angular.module('app.category', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('main.category', {
            url: '^/category/:id',
            views: {
                "page-content": {
                    controller: 'CategoryCtrl',
                    templateUrl: 'app/public/category/category.tpl.html'
                }
            },
            data: {pageTitle: 'category'},
            resolve: {
                pages: function (crudService, $stateParams) {
                    return crudService.getPagesFromCategory($stateParams.id, null, new Date().getTime())
                }
            }
        });
    })

    .controller('CategoryCtrl',
        function CategoryController($scope, $stateParams, $sce, pages, crudService) {
            $scope.pages = pages.data;
            pagesToHTML($scope.pages);


            $scope.loadMore = function () {
                $scope.lastDate = getLastDate();
                crudService.getPagesFromCategory($stateParams.id, null, Date.parse($scope.lastDate)).then(function (res) {
                    var pages = res.data;
                    pagesToHTML(pages);
                    $scope.pages = $scope.pages.concat(pages);
                });
            };

            function pagesToHTML(pages) {
                angular.forEach(pages, function (page) {
                    page.content = $sce.trustAsHtml(page.content);
                });
            }

            function getLastDate() {
                return $scope.pages[$scope.pages.length - 1].date;
            }
        });