(function () {
    'use strict';
    var ServiceId = 'NotificationService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', 'authService','$cookies', '$http', 'toaster', '$q', NotificationDetailserviceFunc]);
    function NotificationDetailserviceFunc($rootScope, authService, $cookies, $httpProvider, toaster, $q) {
        var ecareData = { token: $cookies.get("access_token"), baseUrl: $cookies.get("ESupportAPIUrl") }; 
        
        var service = {
            getNotificationDetails: null,
            updateNotification: null,
            addNotification: null,
            deleteNotification: null,
        };
        service.getNotificationDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: ecareData.baseUrl + 'api/school/Notification',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getNotificationDetails', data);
                //toaster.pop('success', "GetNotificationDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetNotificationDetails", "Completed", 2000);
                    failureCallBack('getNotificationDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addNotification = function (_Notification, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'POST',
                url: ecareData.baseUrl +'api/school/Notification/Insert',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Notification
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addNotification", "Completed", 2000);
                successCallBack('addNotification', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addNotification", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addNotification', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateNotification = function (_Notification, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'PUT',
                url: ecareData.baseUrl + 'api/school/Notification/Update/' + _Notification.Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Notification
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('updateNotification', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "updateNotification", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateNotification', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.deleteNotification = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Delete',
                url: ecareData.baseUrl + 'api/school/Notification/Delete/' + Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {
                   
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteNotification", "Completed", 2000);
                successCallBack('deleteNotification', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteNotification", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteNotification', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        
        return service;
    }
})();