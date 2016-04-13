angular.module('app.archive', [
        'services.crud',
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('main.archive', {
            url: '^/archive',
            views: {
                "page-content": {
                    controller: 'ArchiveCtrl',
                    templateUrl: 'app/public/archive/archive.tpl.html'
                }
            },
            data: {pageTitle: 'archive'}
        });
    })

    .controller('ArchiveCtrl',
        function ArchiveController($scope) {
            $scope.myDate = new Date();
            $scope.minDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() - 2,
                $scope.myDate.getDate());
            $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() + 2,
                $scope.myDate.getDate());
            $scope.onlyWeekendsPredicate = function (date) {
                var day = date.getDay();
                return day === 0 || day === 6;
            };

            $scope.pages = pages.data;
            pagesToHTML($scope.pages);


            $scope.loadMore = function () {
                $scope.lastDate = getLastDate();
                console.log($scope.lastDate);
                crudService.getPagesFromCategory($stateParams.id, Date.parse($scope.lastDate)).then(function (res) {
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