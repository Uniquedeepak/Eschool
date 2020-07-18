(function () {
    'use strict';
    var ServiceId = 'StudentDetailservice';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', StudentDetailserviceFunc]);

    function StudentDetailserviceFunc( $rootScope, $httpProvider,toaster, $q) {

        var service = {
            getStudentDetails: null,
            addStudent:null,
            updateStudent: null,
            deleteStudent: null,
            getAllClass: null,
            getAdmissionNo: null,
            getStudentsByClass:null,
        };

        service.getAdmissionNo = function (CID,successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: '../Home/GetAdmissionNo?ClassId=' + CID,
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetStudentDetails", "Completed", 1000);
                successCallBack('getAdmissionNo', data);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getAdmissionNo', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
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
        service.getStudentsByClass = function (Id, successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetStudentsByClass?ClassId=' + Id,
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetStudentDetails", "Completed", 1000);
                successCallBack('getStudentsByClass', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getStudentsByClass", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getStudentsByClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        //GetMultiChildParent
        service.getMultiChildParent = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: '../Home/GetMultiChildParent',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetStudentDetails", "Completed", 1000);
                successCallBack('getMultiChildParent', data);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getMultiChildParent", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getMultiChildParent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.getAllClass = function (successCallBack, failureCallBack) {
           // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: '../Home/GetClasses',
                data: {

                }
            }).success(function (data, status, headers, config) {
              //  toaster.pop('success', "GetClasses", "Completed", 1000);
                successCallBack('GetClass', data);
             //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetClasses", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('GetClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
               // $scope.loading = false;
            });
        };
        service.addStudent = function (student, successCallBack, failureCallBack) {
            //$scope.loading = true;
            
            $httpProvider({
                method: 'Post',
                url: '../Home/AddStudent',
                data: {
                    student: student
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "AddStudent", "Completed", 1000);
                successCallBack('addStudent', data);
                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "AddStudent", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addStudent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateStudent = function (student, successCallBack, failureCallBack) {
            //$scope.loading = true;
            
            $httpProvider({
                method: 'Post',
                url: '../Home/UpdateStudent',
                data: {
                    AdmissionId: student.AdmissionId,
                    student: student
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateStudent", "Completed", 1000);
                successCallBack('updateStudent', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateStudent", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateStudent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteStudent = function (AdmissionId, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteStudent',
                data: {
                    AdmissionId: AdmissionId
                   
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteStudent", "Completed", 1000);
                successCallBack('deleteStudent', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteStudent", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteStudent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();