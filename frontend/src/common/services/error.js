angular.module('services.error', ['app.config'])
.factory ('errorInterceptor',  [
    '$q',
    '$rootScope',
    'ERROR_EVENTS',
    function ($q, $rootScope, ERROR_EVENTS) {
        return {
            responseError: function(err) {
                $rootScope.$broadcast(ERROR_EVENTS.error, err);
                $q.reject();
            }
        }
    }]);