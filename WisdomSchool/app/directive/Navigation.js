angular.module('AngularApp').directive('navigation', function () {

    return {
        restrict: 'E',
        templateUrl: 'app/directive/navigation.html',
        controller: function ($scope, CommonSrvc, $http) {
            CommonSrvc.getSchool(successCallBack, failureCallBack);
            $http.get('app/menu.json').success(function (data) {
                $scope.menuItem = data;
            });
            function successCallBack(call, data) {
                switch (call) {
                    case 'getSchool':
                        $scope.isLoading = false;
                        if (data) {
                            $scope.schoolDetails = data[0];
                            break;
                        }
                        break;
                }
            };
            function failureCallBack(call, data) {
                switch (call) {
                    case 'getSchool':
                        $scope.isLoading = false;
                        alert("Error Occured during getSchool. " + data);
                        break;
                }
            };
        },
    };
});