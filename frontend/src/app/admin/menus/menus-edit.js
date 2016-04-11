angular.module('admin.menus-edit', [
        'services.crud',
        'ui.router',
        'checklist-model'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('admin.menus-edit', {
            url: '/menus/edit/:id',
            views: {
                "content": {
                    controller: 'EditMenusCtrl',
                    templateUrl: 'app/admin/menus/menus-edit.tpl.html'
                }
            },
            data: {pageTitle: 'admin.edit'}
        });
    })

    .controller('EditMenusCtrl',
        function EditMenusController($scope, $rootScope, $state, $stateParams, crudService, BASE_URL, SUCCESS_EVENTS) {
            $scope.pageId = $stateParams.id;

            $scope.itemsToInclude = [];

            crudService.getPages('?type=page').then(function (res) {
                $scope.pageItems = pagesToMenuItems(res.data);
            });

            function pagesToMenuItems(pages) {
                var pageItems = [];
                for (var i = 0; i < pages.length; i++) {
                    pageItems.push({
                        'title': pages[i].title,
                        'path': BASE_URL + '#/page/' + pages[i].slug
                    })
                }
                return pageItems;
            }

            crudService.getCategories().then(function (res) {
                $scope.categoryItems = categoriesToMenuItems(res.data);
            });

            function categoriesToMenuItems(categories) {
                var catItems = [];
                for (var i = 0; i < categories.length; i++) {
                    catItems.push({
                        'title': categories[i].title,
                        'path': BASE_URL + '#/category/' + categories[i].slug
                    })
                }
                return catItems;
            }


            crudService.getMenu($stateParams.id).then(function (res) {
                $scope.menu = res.data;
                $scope.itemsToInclude = $scope.menu.items;
                markObjectsAlreadyInMenu();
            });

            $scope.deleteItem = function (item) {
                $scope.itemsToInclude.splice(item, 1);
            };

            $scope.submit = function () {
                $scope.menu.items = $scope.itemsToInclude;

                crudService.updateMenu($scope.menu._id, $scope.menu).then(function (res) {
                    if (res.data) {
                        $rootScope.$broadcast(SUCCESS_EVENTS.success, 'Menu updated.');
                        $state.go('admin.menus-list');
                    }
                });
            };

            function markObjectsAlreadyInMenu() {
                for (var i = 0; i < $scope.itemsToInclude.length; i++) {
                    var j;
                    for (j = 0; j < $scope.pageItems.length; j++) {
                        if (checkEquality($scope.itemsToInclude[i], $scope.pageItems[j])) {
                            $scope.itemsToInclude[i] = $scope.pageItems[j];
                        }
                    }

                    for (j = 0; j < $scope.categoryItems.length; j++) {
                        if (checkEquality($scope.itemsToInclude[i], $scope.categoryItems[j])) {
                            $scope.itemsToInclude[i] = $scope.categoryItems[j];
                        }
                    }
                }
            }

            function checkEquality(item1, item2) {
                return (item1.title === item2.title && item1.path === item2.path)
            }
        }
    )
;




