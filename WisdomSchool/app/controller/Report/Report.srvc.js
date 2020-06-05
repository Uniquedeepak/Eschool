(function () {
    'use strict';
    var ServiceId = 'ReportSrvc';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', 'CommonSrvc', '$http', 'toaster', '$q', ReportSrvc]);

    function ReportSrvc($rootScope,CommonSrvc, $httpProvider,toaster, $q) {

        var service = {
            getAllSubmitedFeeDetail: null,
            getClassFeeHeadDetail: null,
            getFeeHeadDetail:null,
            getTopFeeDetail: null,
            getPendingFeeDetail: null,
            getAttendanceDetail: null,
            getMonthlyAttendance: null
        };

        service.getAllSubmitedFeeDetail = function (session,successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/GetAllSubmitedFeeDetail',
                data: {
                    Session: session
                }
            }).success(function (data, status, headers, config) {
               // toaster.pop('success', "GetAllSubmitedFeeDetail", "Completed", 1000);
                successCallBack('getAllSubmitedFeeDetail', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetAllSubmitedFeeDetail", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getAllSubmitedFeeDetail', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getAttendanceDetail = function (session,successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetAttendance',
                data: {
                    Session: session
                }
            }).success(function (data, status, headers, config) {
                // toaster.pop('success', "GetAllSubmitedFeeDetail", "Completed", 1000);
                successCallBack('getAttendanceDetail', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getAttendanceDetail", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getAttendanceDetail', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };

        service.getMonthlyAttendance = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/GetMonthlyAttendance',
                data: {
                    Class: "THIRD"
                }
            }).success(function (data, status, headers, config) {
                successCallBack('getMonthlyAttendance', data);
                console.log(data);
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getMonthlyAttendance", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getMonthlyAttendance', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
            });
        };

        service.getTopFeeDetail = function (session,successCallBack, failureCallBack) {
            // $scope.loading = true;
             $httpProvider({
                method: 'Post',
                url: './Fee/GetTopFeeDetail',
                data: {
                    Session: session
                }
            }).success(function (data, status, headers, config) {
                // toaster.pop('success', "GetAllSubmitedFeeDetail", "Completed", 1000);
                successCallBack('getTopFeeDetail', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Get Top Fee Detail", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getTopFeeDetail', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getPendingFeeDetail = function (session,ClassId, successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/GetTopFeeDetail',
                data: {
                    Session: session,
                    ClassId: ClassId
                }
            }).success(function (data, status, headers, config) {
                // toaster.pop('success', "GetAllSubmitedFeeDetail", "Completed", 1000);
                successCallBack('getPendingFeeDetail', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Get Top Pending Fee Detail", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getPendingFeeDetail', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };

        service.getClassFeeHeadDetail = function (student, successCallBack, failureCallBack) {
            // $scope.loading = true;
            var deferred = $q.defer();
            $httpProvider({
                method: 'Post',
                url: './Fee/GetClassFeeDetail',
                data: {
                    SelectedClass: student.Class,
                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetClassFeeDetail", "Completed", 1000);
                successCallBack('getClassFeeHeadDetail', data);
                deferred.resolve();
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
                deferred.resolve();
                // $scope.loading = false;
            });
            return deferred.promise;
        };

        service.getFeeHeadDetail = function ( successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/GetFeeHeadDetail',
                data: {
                    
                }
            }).success(function (data, status, headers, config) {
               // toaster.pop('success', "GetClassFeeDetail", "Completed", 1000);
                successCallBack('getFeeHeadDetail', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getFeeHeadDetail", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getFeeHeadDetail', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };


        return service;
    }
})();