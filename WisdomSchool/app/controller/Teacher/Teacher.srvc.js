(function () {
    'use strict';
    var ServiceId = 'TeacherService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', TeacherDetailserviceFunc]);

    function TeacherDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {

        var service = {
            getTeacherDetails: null,
            addTeacher: null,
            updateTeacher: null,
            deleteTeacher: null
        };

        service.getTeacherDetails = function (successCallBack, failureCallBack) {
           // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetEmployee',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getTeacherDetails', data);
                //toaster.pop('success', "GetTeacherDetails", "Completed", 2000);
                //$scope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetTeacherDetails", "Completed", 2000);
                    failureCallBack('getTeacherDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
               // $scope.loading = false;
            });
        };

        service.addTeacher = function (Teacher, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/AddEmployee',
                data: {
                    Employee: Teacher
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "Add Teacher", "Completed", 2000);
                successCallBack('addTeacher', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Add Teacher", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addTeacher', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        service.updateTeacher = function (Teacher, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateEmployee',
                data: {
                    Tid: Teacher.EEID,
                    Employee: Teacher
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateTeacher", "Completed", 2000);
                successCallBack('updateTeacher', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateTeacher", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateTeacher', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        service.deleteTeacher = function (Tid, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteEmployee',
                data: {
                    Tid: Tid
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteTeacher", "Completed", 2000);
                successCallBack('deleteTeacher', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteTeacher", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteTeacher', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        return service;
    }
})();