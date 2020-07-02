(function () {
    'use strict';
    var ServiceId = 'UserDetailservice';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', UserDetailserviceFunc]);

    function UserDetailserviceFunc( $rootScope, $httpProvider,toaster, $q) {

        var service = {
            getStudentDetails: null,
            createUserLogin: null
        };

        service.getStudentDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: '../Home/GetStudentDetails',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetStudentDetails", "Completed", 1000);
                if (typeof data === "object") {
                    successCallBack('getStudentDetails', data);
                }
                
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetStudentDetails", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getStudentDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.createUserLogin = function (students, successCallBack, failureCallBack) {
            //$scope.loading = true;
            
            $httpProvider({
                method: 'Post',
                url: '../Student/CreateStudentLogin',
                data: {
                    students: students
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "createUserLogin", "Completed", 1000);
                successCallBack('createUserLogin', data);
                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "createUserLogin", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('createUserLogin', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();