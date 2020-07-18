(function () {
    'use strict';
    var ServiceId = 'InventoryItemService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', InventoryItemserviceFunc]);
    function InventoryItemserviceFunc($rootScope, $httpProvider, toaster, $q) {
        var service = {
            getInventoryItemDetails: null,
            addInventoryItem: null,
            updateInventoryItem: null,
            deleteInventoryItem: null
        };
        service.getInventoryItemDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Inventory/GetInventoryItem',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getInventoryItemDetails', data);
                //toaster.pop('success', "GetInventoryItemDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetInventoryItemDetails", "Completed", 2000);
                    failureCallBack('getInventoryItemDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addInventoryItem = function (InventoryItem, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/AddInventoryItem',
                data: {
                    _InventoryItem: InventoryItem
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addInventoryItem", "Completed", 2000);
                successCallBack('addInventoryItem', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addInventoryItem", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addInventoryItem', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateInventoryItem = function (InventoryItem, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/UpdateInventoryItem',
                data: {
                    ID: InventoryItem.IIID,
                    _InventoryItem: InventoryItem
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateInventoryItem", "Completed", 2000);
                successCallBack('updateInventoryItem', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateInventoryItem", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateInventoryItem', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteInventoryItem = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/DeleteInventoryItem',
                data: {
                    ID: Id
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "deleteInventoryItem", "Completed", 2000);
                successCallBack('deleteInventoryItem', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "deleteInventoryItem", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteInventoryItem', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();