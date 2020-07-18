(function () {
    'use strict';
    var ServiceId = 'InventoryIssueService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', InventoryIssueserviceFunc]);
    function InventoryIssueserviceFunc($rootScope, $httpProvider, toaster, $q) {
        var service = {
            getInventoryIssueDetails: null,
            addInventoryIssue: null,
            updateInventoryIssue: null,
            deleteInventoryIssue: null
        };
        service.getInventoryIssueDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Inventory/GetInventoryIssue',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getInventoryIssueDetails', data);
                //toaster.pop('success', "GetInventoryIssueDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetInventoryIssueDetails", "Completed", 2000);
                    failureCallBack('getInventoryIssueDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addInventoryIssue = function (InventoryIssue, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/AddInventoryIssue',
                data: {
                    _InventoryIssue: InventoryIssue
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addInventoryIssue", "Completed", 2000);
                successCallBack('addInventoryIssue', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addInventoryIssue", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addInventoryIssue', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateInventoryIssue = function (InventoryIssue, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/UpdateInventoryIssue',
                data: {
                    ID: InventoryIssue.IIID,
                    _InventoryIssue: InventoryIssue
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateInventoryIssue", "Completed", 2000);
                successCallBack('updateInventoryIssue', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateInventoryIssue", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateInventoryIssue', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteInventoryIssue = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/DeleteInventoryIssue',
                data: {
                    ID: Id
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "deleteInventoryIssue", "Completed", 2000);
                successCallBack('deleteInventoryIssue', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "deleteInventoryIssue", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteInventoryIssue', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();