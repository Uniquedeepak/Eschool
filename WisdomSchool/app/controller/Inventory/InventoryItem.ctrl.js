(function () {
    'use strict';
    var controllerId = 'InventoryItemCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'InventoryItemService',
         'InventoryCategoryService',
          
          InventoryItemCtlr
        ]);
    function InventoryItemCtlr($scope, InventoryItemService, InventoryCategoryService) {
        $scope.heading = "Inventory Item";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            InventoryCategoryService.getInventoryCategoryDetails(successCallBack, failureCallBack);
        }
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete === 3;
            $scope.crud = isDelete;
            if (item)
                assignCategory(item.ICID);
            else
                assignCategory("0");
            $scope.selectedInventoryItem = item;
            $("#EditInventoryItemModel").modal();
        }
        $scope.deletesInventoryItem = function (InventoryItemDetail) {
            $scope.isLoading = true;
            InventoryItemService.deleteInventoryItem(InventoryItemDetail.IIID, successCallBack, failureCallBack);
        }
        $scope.addInventoryItem = function (InventoryItemDetail) {
            $scope.isLoading = true;
            InventoryItemDetail.Category = $scope.SelectedCategory.ICID;
            InventoryItemDetail.ICID = $scope.SelectedCategory.ICID;
            InventoryItemService.addInventoryItem(InventoryItemDetail, successCallBack, failureCallBack);
        }
        $scope.updateInventoryItem = function (InventoryItemDetail)
        {
            $scope.isLoading = true;
            InventoryItemDetail.Category = $scope.SelectedCategory.ICID;
            InventoryItemDetail.ICID = $scope.SelectedCategory.ICID;
            InventoryItemService.updateInventoryItem(InventoryItemDetail, successCallBack, failureCallBack);
        }
        function assignCategory(id) {
            var i = 0;
            angular.forEach($scope.InventoryCategoryDetails, function (value, key) {
                if (id) {
                    if (value.ICID === parseInt(id)) {
                        $scope.SelectedCategory = value;
                    }
                }
                i = i + 1;
            });
        }
        function setCategory(List) {
            var InventoryList = [];
            angular.forEach(List, function (value, key) {
                assignCategory(value.Category);
                value.Category = $scope.SelectedCategory.Category;
                InventoryList.push(value);
            });
            return InventoryList;
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getInventoryCategoryDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.InventoryCategoryDetails = data;
                        $scope.InventoryCategoryDetails.push({ ICID: 0, Category :"Select Category"});
                        InventoryItemService.getInventoryItemDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'getInventoryItemDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        var Items = setCategory(data);
                        $scope.InventoryItemDetails = Items;
                        $("#EditInventoryItemModel .close").click();
                        break;
                    }
                    break;
                case 'addInventoryItem':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryItemModel .close").click();
                        break;
                    }
                    break;
                case 'updateInventoryItem':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryItemModel .close").click();
                        break;
                    }
                    break;
                case 'deleteInventoryItem':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryItemModel .close").click();
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getInventoryItemDetails':
                    $scope.isLoading = false;
                    break;
                case 'addInventoryItem':
                    $scope.isLoading = false;
                    break;
                case 'updateInventoryItem':
                    $scope.isLoading = false;
                    break;
                case 'deleteInventoryItem':
                    $scope.isLoading = false;
                    break;
            }
        };
    }
})();



