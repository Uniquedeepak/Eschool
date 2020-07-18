(function () {
    'use strict';
    var ServiceId = 'AttendanceService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', AttendanceServiceFunc]);

    function AttendanceServiceFunc($rootScope, $httpProvider, toaster, $q) {
        var service = {
            getStudentDetails: null,
            addAttendance:null
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
                successCallBack('getStudentDetails', data);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetStudentDetails", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
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
        service.addAttendance = function (StAttendance, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/AddAttendance',
                data: {
                    Attendance: StAttendance
                }
            }).success(function (data, status, headers, config) {
                if (typeof data === 'string')
                    toaster.pop('success', data, "Completed", 2000);
                else
                    toaster.pop('success', "Attendance Marked Successfully", "Completed", 2000);
                successCallBack('addAttendance', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Add Attendance", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addAttendance', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();