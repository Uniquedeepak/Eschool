(function () {
    'use strict';
    var ServiceId = 'LiveClassService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', 'CommonSrvc','localStorageService', '$http', 'toaster', '$q', LiveClassDetailserviceFunc]);
    function LiveClassDetailserviceFunc($rootScope, CommonSrvc, localStorageService, $httpProvider, toaster, $q) {
        var ecareData = localStorageService.get('authorizationData');
        var service = {
            getLiveClassDetails: null,
            updateLiveClass: null,
            addLiveClass: null,
            deleteLiveClass: null,
        };
        service.getLiveClassDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: ecareData.baseUrl + 'api/school/LiveClass',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getLiveClassDetails', data);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetLiveClassDetails", "Completed", 2000);
                    failureCallBack('getLiveClassDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addLiveClass = function (_LiveClass, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'POST',
                url: ecareData.baseUrl +'api/school/LiveClass/Insert',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _LiveClass
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addLiveClass", "Completed", 2000);
                successCallBack('addLiveClass', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addLiveClass", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addLiveClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateLiveClass = function (_LiveClass, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'PUT',
                url: ecareData.baseUrl + 'api/school/LiveClass/Update/' + _LiveClass.Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _LiveClass
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('updateLiveClass', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "updateLiveClass", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateLiveClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.deleteLiveClass = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Delete',
                url: ecareData.baseUrl + 'api/school/LiveClass/Delete/' + Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {
                   
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteLiveClass", "Completed", 2000);
                successCallBack('deleteLiveClass', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteLiveClass", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteLiveClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        
        return service;
    }
})();