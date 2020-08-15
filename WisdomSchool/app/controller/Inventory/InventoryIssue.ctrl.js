(function () {
    'use strict';
    var controllerId = 'InventoryIssueCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'InventoryIssueService',
         'InventoryCategoryService',
         'InventoryItemService',
          
         '$window',
          InventoryIssueCtlr
        ]);
    function InventoryIssueCtlr($scope, InventoryIssueService, InventoryCategoryService, InventoryItemService, window) {
        $scope.heading = "Inventory";
        $scope.subheading = "Issue";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            InventoryCategoryService.getInventoryCategoryDetails(successCallBack, failureCallBack);
        }
        $scope.open = function (form, item) {
            
            $scope.disableCtrl = form === 3;
            $scope.crud = form;
            if (form === 1) {
                assignCategory("0");
                assignItem("0");
            }
            else
            {
                assignCategory("", item.Category);
                assignItem("",item.Item);
            }
            $scope.getItemByCategory();
            
            $scope.selectedInventoryIssue = item;
            $("#EditInventoryIssueModel").modal();
        }
        $scope.deletesInventoryIssue = function (InventoryIssueDetail) {
            $scope.isLoading = true;
            InventoryIssueService.deleteInventoryIssue(InventoryIssueDetail.IIID, successCallBack, failureCallBack);
        }
        $scope.addInventoryIssue = function (InventoryIssueDetail) {
            $scope.isLoading = true;
            InventoryIssueDetail.Category = $scope.SelectedCategory.ICID;
            InventoryIssueDetail.Item = $scope.SelectedItem.IIID;
            InventoryIssueService.addInventoryIssue(InventoryIssueDetail, successCallBack, failureCallBack);
        }
        $scope.updateInventoryIssue = function (InventoryIssueDetail)
        {
            $scope.isLoading = true;
            InventoryIssueDetail.Category = $scope.SelectedCategory.ICID;
            InventoryIssueDetail.Item = $scope.SelectedItem.IIID;
            InventoryIssueService.updateInventoryIssue(InventoryIssueDetail, successCallBack, failureCallBack);
        }
        function assignCategory(id,name) {
            var i = 0;
            angular.forEach($scope.InventoryCategoryDetails, function (value, key) {
                if (id) {
                    if (value.ICID === parseInt(id)) {
                        $scope.SelectedCategory = value;
                    }
                }
                if (name) {
                    if (value.Category === name) {
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
        function assignItem(id,name) {
            var i = 0;
            angular.forEach($scope.InventoryItems, function (value, key) {
                if (id) {
                    if (value.IIID === parseInt(id)) {
                        $scope.SelectedItem = value;
                    }
                }
                if (name) {
                    if (value.Item === name) {
                        $scope.SelectedItem = value;
                    }
                }
                i = i + 1;
            });
        }
        function setItem(List) {
            var InventoryList = [];
            angular.forEach(List, function (value, key) {
                assignItem(value.Item);
                value.Item = $scope.SelectedItem.Item;
                InventoryList.push(value);
            });
            return InventoryList;
        }
        $scope.getItemByCategory = function getItemByCategory() {
            var InventoryList = [];
            var List = $scope.InventoryItems;
            InventoryList.push({ IIID: 0, Item: "Select Item" });
            angular.forEach(List, function (value, key) {
                if (parseInt(value.Category) === parseInt($scope.SelectedCategory.ICID)) {
                    InventoryList.push(value);
                }
            });
            $scope.InventoryItemDetails = InventoryList;
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getInventoryCategoryDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.InventoryCategoryDetails = data;
                        $scope.InventoryCategoryDetails.push({ ICID: 0, Category: "Select Category" });
                        InventoryItemService.getInventoryItemDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'getInventoryItemDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.InventoryItems = data;
                        $scope.InventoryItems.push({ IIID: 0, Item: "Select Item" });
                        InventoryIssueService.getInventoryIssueDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'getInventoryIssueDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.InventoryIssueData = data;
                        var Items = setCategory(data);
                        Items = setItem(data);
                        $scope.InventoryIssueDetails = Items;
                        $("#EditInventoryIssueModel .close").click();
                        break;
                    }
                    break;
                case 'addInventoryIssue':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryIssueModel .close").click();
                        break;
                    }
                    break;
                case 'updateInventoryIssue':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryIssueModel .close").click();
                        break;
                    }
                    break;
                case 'deleteInventoryIssue':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditInventoryIssueModel .close").click();
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getInventoryIssueDetails':
                    $scope.isLoading = false;
                    break;
                case 'addInventoryIssue':
                    $scope.isLoading = false;
                    break;
                case 'updateInventoryIssue':
                    $scope.isLoading = false;
                    break;
                case 'deleteInventoryIssue':
                    $scope.isLoading = false;
                    break;
            }
        };
    }
})();



