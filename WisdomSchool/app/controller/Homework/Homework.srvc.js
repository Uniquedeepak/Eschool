(function () {
    'use strict';
    var ServiceId = 'HomeworkService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', HomeworkDetailserviceFunc]);
    function HomeworkDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {
        var service = {
            getHomeworkDetails: null,
            updateHomework: null,
            addHomework: null,
            deleteHomework: null,
            downloadHomework:null
        };
        service.getHomeworkDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetHomework',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getHomeworkDetails', data);
                //toaster.pop('success', "GetHomeworkDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetHomeworkDetails", "Completed", 2000);
                    failureCallBack('getHomeworkDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addHomework = function (Homework, file, successCallBack, failureCallBack) {
            var fd = new FormData();
            Homework.data = null;
            fd.append('file', file);
            fd.append('Homework', JSON.stringify(Homework));
            $httpProvider({
                method: 'Post',
                url: './Home/AddHomework',
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },
                data: fd
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addHomework", "Completed", 2000);
                successCallBack('addHomework', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addHomework", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addHomework', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteHomework = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteHomework',
                data: {
                    ID: Id
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteHomework", "Completed", 2000);
                successCallBack('deleteHomework', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteHomework", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteHomework', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateHomework = function (Homework, file, successCallBack, failureCallBack) {
            var fd = new FormData();
            Homework.data = null;
            fd.append('file', file);
            fd.append('Homework', JSON.stringify(Homework));
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateHomework',
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },
                data: fd
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('updateHomework', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "updateHomework", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateHomework', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.downloadHomework = function (id, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'Get',
                url: './Home/DownloadHomework?id='+id,
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('downloadHomework', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "downloadHomework", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('downloadHomework', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        return service;
    }
})();