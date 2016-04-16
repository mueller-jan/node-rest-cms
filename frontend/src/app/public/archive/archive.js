angular.module('app.archive', [
        'services.crud',
        'checklist-model',
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
            data: {pageTitle: 'archive'},
            resolve: {
                categories: function (crudService, $stateParams) {
                    return crudService.getCategories()
                }
            }
        });
    })

    .controller('ArchiveCtrl',
        function ArchiveController($scope, $sce, crudService, categories) {
            $scope.categories = categories.data;


            var categoryIDs = [];
            for (var i = 0; i < $scope.categories.length; i++) {
                categoryIDs.push($scope.categories[i]._id)
            }

            var oldestPost;
            crudService.getOldestPost().then(function(res) {
                oldestPost = res.data;
                $scope.dateRanges = createArchive(Date.parse(oldestPost.date));
            });
            
            $scope.loadPostsByDateRange = function(dateRange) {
                crudService.getPagesFromCategory(categoryIDs, Date.parse(dateRange.startDate), Date.parse(dateRange.endDate), 100).then(function (res) {
                    $scope.pages =  res.data;
                    pagesToHTML($scope.pages);
                })
            };

            $scope.loadPostsByCategory = function(categoryId) {
                crudService.getPagesFromCategory(categoryId).then(function (res) {
                    $scope.pages =  res.data;
                    pagesToHTML($scope.pages);
                })
            };
            
            function pagesToHTML(pages) {
                angular.forEach(pages, function (page) {
                    page.content = $sce.trustAsHtml(page.content);
                });
            }

            /**
             * Creates dateranges for posts from oldest posts' date to now.
             * @param endDate date of oldest post
             * @returns {Array} dateranges
             */
            function createArchive(endDate) {
                var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                var dateRanges = [];
                var startDate = new Date();

                while (startDate >= endDate) {
                    var month = startDate.getMonth();
                    for (month; month >= 0; month--) {
                        var firstDay = new Date(startDate.getFullYear(), month, 1);
                        var lastDay = new Date(startDate.getFullYear(), month + 1, 0);
                        dateRanges.push({text: monthNames[month] + " " + startDate.getFullYear(), startDate: firstDay, endDate: lastDay});
                    }
                    startDate.setFullYear(startDate.getFullYear() - 1);
                }
                return dateRanges;
            }
        });

