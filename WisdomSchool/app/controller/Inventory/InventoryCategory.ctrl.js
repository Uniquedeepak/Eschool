(function () {
    'use strict';
    var controllerId = 'InventoryCategoryCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'InventoryCategoryService',
          
          InventoryCategoryCtlr
        ]);
    function InventoryCategoryCtlr($scope, InventoryCategoryService) {
        $scope.heading = "Inventory Category";
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
            $scope.selectedInventoryCategory = item;
            $("#EditInventoryCategoryModel").modal();
        }
        $scope.deletesInventoryCategory = function (InventoryCategoryDetail) {
            $scope.isLoading = true;
            InventoryCategoryService.deleteInventoryCategory(InventoryCategoryDetail.ICID, successCallBack, failureCallBack);
        }
        $scope.addInventoryCategory = function (InventoryCategoryDetail) {
            $scope.isLoading = true;
            InventoryCategoryService.addInventoryCategory(InventoryCategoryDetail, successCallBack, failureCallBack);
        }
        $scope.updateInventoryCategory = function (InventoryCategoryDetail)
        {
            $scope.isLoading = true;
            //Todo:
            //$scope.msgTitle = 'Alert';
            //$scope.msgBody = 'The Tomatoes Exploded!';
            //$scope.msgType = 'warning';

            //$scope.flash = flash;
            //flash.pop({ title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType });

            InventoryCategoryService.updateInventoryCategory(InventoryCategoryDetail, successCallBack, failureCallBack);
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getInventoryCategoryDetails':
                    
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.InventoryCategoryDetails = data;
                        $("#EditInventoryCategoryModel .close").click();
                        break;
                    }
                    break;
                case 'addInventoryCategory':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryCategoryModel .close").click();
                        break;
                    }
                    break;
                case 'updateInventoryCategory':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryCategoryModel .close").click();
                        break;
                    }
                    break;
                case 'deleteInventoryCategory':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryCategoryModel .close").click();
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getInventoryCategoryDetails':
                    $scope.isLoading = false;
                    break;
                case 'addInventoryCategory':
                    $scope.isLoading = false;
                    break;
                case 'updateInventoryCategory':
                    $scope.isLoading = false;
                    break;
                case 'deleteInventoryCategory':
                    $scope.isLoading = false;
                    break;
            }
        };
    }
})();



