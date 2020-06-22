(function () {
    'use strict';
    var ServiceId = 'CollectFeeSrvc';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', 'CommonSrvc', '$http', 'toaster', '$q', CollectFeeSrvc]);
    function CollectFeeSrvc($rootScope,CommonSrvc, $httpProvider,toaster, $q) {
        var service = {
            getStudentDetails: null,
            getStudentFeeDetail: null,
            UpdateStudentFeeDetail: null,
            getClassFeeHeadDetail: null,
            submitStudentFee: null,
            deleteFeeStudent:null,
            getAdmissionFee: null,
            getAllClass: null,
            getStudentFine: null,
        };
        service.getStudentDetails = function (Id,successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetStudentsByClass?ClassId=' + Id,
                data: {
                   
                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetStudentDetails", "Completed", 1000);
                successCallBack('getStudentDetails', data);
                //   $scope.loading = false;
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
                // $scope.loading = false;
            });
        };
        service.getAdmissionFee = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Fee/GetAdmissionFee',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetAdmissionFee", "Completed", 1000);
                successCallBack('getAdmissionFee', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetAdmissionFee", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getAdmissionFee', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getStudentFeeDetail = function (student,schoolsession, successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/GetStudentFeeDetail',
                data: {
                    AdmNo: student.AdmissionNo,
                    Session: schoolsession
                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetStudentFeeDetail", "Completed", 1000);
                successCallBack('getStudentFeeDetail', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetStudentFeeDetail", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getStudentFeeDetail', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getClassFeeHeadDetail = function (student, successCallBack, failureCallBack) {
           // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/GetClassFeeDetail',
                data: {
                    SelectedClass: student.Class,
                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetClassFeeDetail", "Completed", 1000);
                successCallBack('getClassFeeHeadDetail', data);
             //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetClassFeeDetail", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getClassFeeHeadDetail', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
               // $scope.loading = false;
            });
        };
        service.getAllClass = function (successCallBack, failureCallBack) {
           // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetClasses',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetClasses", "Completed", 1000);
                successCallBack('GetClass', data);
             //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetClasses", "Completed", 1000);
                if (data) {
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
        service.submitStudentFee = function (stFeeDetail, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/AddStudentFeeDetail',
                data: {
                    stFeeDetail: stFeeDetail
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "SubmitStudentFee", "Completed", 1000);
                successCallBack('submitStudentFee', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "SubmitStudentFee", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('submitStudentFee', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteFeeStudent = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/DeleteStudentFee',
                data: {
                    Id: Id
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteStudentFee", "Completed", 1000);
                successCallBack('deleteFeeStudent', data);
                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('success', "DeleteStudentFee", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteFeeStudent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateStFeeDetail = function (studentFeeDetail, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: '../Fee/UpdateStFeeDetail',
                data: {
                    AdmissionNo: studentFeeDetail.AdmissionNo,
                    student: studentFeeDetail
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "GetClassFeeDetail", "Completed", 1000);
                successCallBack('updateStFeeDetail', data);
                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('success', "GetClassFeeDetail", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateStFeeDetail', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.getStudentFine = function (AdmissionNo, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'Get',
                url: '../Fee/GetStudentFine?AdmNo=' + AdmissionNo,
                data: {
                    AdmNo: AdmissionNo,
                }
            }).success(function (data, status, headers, config) {
                successCallBack('getStudentFine', data);
            }).error(function (data, status, headers, config) {
                toaster.pop('success', "getStudentFine", "Failed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getStudentFine', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();