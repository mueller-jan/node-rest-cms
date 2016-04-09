angular.module('app.config', [])
    .constant('API_URL', 'http://localhost:3000')
    .constant('BASE_URL', 'http://localhost:63342/node-rest-cms/frontend/src/index.html')

    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    })
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('ERROR_EVENTS', {
        error: 'error'
});