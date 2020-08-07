(function () {
    'use strict';
    var ServiceId = 'LeaveService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', 'CommonSrvc','$cookies', '$http', 'toaster', '$q', LeaveDetailserviceFunc]);
    function LeaveDetailserviceFunc($rootScope, CommonSrvc, $cookies, $httpProvider, toaster, $q) {
        var ecareData = { token: $cookies.get("access_token"), baseUrl: $cookies.get("ESupportAPIUrl") }; 
        var service = {
            getLeaveDetails: null,
            updateLeave: null,
            addLeave: null,
            deleteLeave: null,
        };
        service.getLeaveDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: ecareData.baseUrl + 'api/school/Leave',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getLeaveDetails', data);
                //toaster.pop('success', "GetLeaveDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetLeaveDetails", "Completed", 2000);
                    failureCallBack('getLeaveDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addLeave = function (_Leave, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'POST',
                url: ecareData.baseUrl +'api/school/Leave/Insert',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Leave
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addLeave", "Completed", 2000);
                successCallBack('addLeave', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addLeave", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addLeave', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateLeave = function (_Leave, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'PUT',
                url: ecareData.baseUrl + 'api/school/Leave/Update/' + _Leave.Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Leave
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('updateLeave', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "updateLeave", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateLeave', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.deleteLeave = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Delete',
                url: ecareData.baseUrl + 'api/school/Leave/Delete/' + Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {
                   
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteLeave", "Completed", 2000);
                successCallBack('deleteLeave', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteLeave", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteLeave', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        
        return service;
    }
})();