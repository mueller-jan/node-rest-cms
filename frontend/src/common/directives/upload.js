angular.module('upload', [])
    .directive('upload', ['$parse', function ($parse) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            require: 'ngModel',
            template: '<div class="asset-upload">Drag here to upload</div>',
            link: function (scope, element, attrs, ngModel) {

                //disable drag over and drag enter elements on upload div
                //so that images might not be opened inside the browser

                element.on('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                element.on('dragenter', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });

                element.on('drop', function (e) {
                    //disable default behavior
                    e.preventDefault();
                    e.stopPropagation();

                    console.log(e)
                    console.log(e.originalEvent)

                    //access data transfer property of event
                    if (e.dataTransfer) {
                        if (e.dataTransfer.files.length > 0) {
                            console.log(e.dataTransfer.files)
                            //     //FormData object is only supported by modern browsers
                            //     //create FormData instance and add files to it
                            // var data = new FormData();
                            // // data.append('files', e.dataTransfer.files);
                            // angular.forEach(e.dataTransfer.files, function (value) {
                            //     data.append("files[]", value);
                            // });
                            ngModel.$setViewValue(e.dataTransfer.files);
                            // upload(e.dataTransfer.files);
                        }
                    }
                    return false;
                });
            }
        };
    }]);