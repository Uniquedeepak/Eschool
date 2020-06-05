(function () {
    'use strict';
    var ServiceId = 'InventoryCategoryService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', InventoryCategoryserviceFunc]);
    function InventoryCategoryserviceFunc($rootScope, $httpProvider, toaster, $q) {
        var service = {
            getInventoryCategoryDetails: null,
            addInventoryCategory: null,
            updateInventoryCategory: null,
            deleteInventoryCategory: null
        };
        service.getInventoryCategoryDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Inventory/GetInventoryCategory',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getInventoryCategoryDetails', data);
                //toaster.pop('success', "GetInventoryCategoryDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetInventoryCategoryDetails", "Completed", 2000);
                    failureCallBack('getInventoryCategoryDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addInventoryCategory = function (InventoryCategory, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/AddInventoryCategory',
                data: {
                    inventoryCategory: InventoryCategory
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addInventoryCategory", "Completed", 2000);
                successCallBack('addInventoryCategory', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addInventoryCategory", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addInventoryCategory', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateInventoryCategory = function (InventoryCategory, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/UpdateInventoryCategory',
                data: {
                    ID: InventoryCategory.ICID,
                    _InventoryCategory: InventoryCategory
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateInventoryCategory", "Completed", 2000);
                successCallBack('updateInventoryCategory', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateInventoryCategory", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateInventoryCategory', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteInventoryCategory = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Inventory/DeleteInventoryCategory',
                data: {
                    ID: Id
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "deleteInventoryCategory", "Completed", 2000);
                successCallBack('deleteInventoryCategory', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "deleteInventoryCategory", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteInventoryCategory', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();