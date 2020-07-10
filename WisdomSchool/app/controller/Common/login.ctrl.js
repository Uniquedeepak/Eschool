(function () {
    'use strict';
    var controllerId = 'LoginCtrl';
    angular.module('AngularApp').controller(controllerId,
        [
            '$scope', '$location', 'authService',
            LoginCtrl
        ]);
    function LoginCtrl($scope, $location, authService) {
        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.message = "";

        $scope.login = function () {
            authService.login($scope.loginData).then(function (response) {
                $location.path('/home');
            },
                function (err) {
                    $scope.message = err.error_description;
                });
        };
    }
})();



