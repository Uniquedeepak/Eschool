(function () {
    'use strict';
    var controllerId = 'HouseCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'HouseService',
          
          HouseCtlrFn
        ]);
    function HouseCtlrFn($scope, HouseService) {
        $scope.heading = "House Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            HouseService.getHouseDetails(successCallBack, failureCallBack);
        }
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete===3;
            $scope.crud = isDelete;
            $scope.selectedHouse = item;
            $("#EditHouseModel").modal();
        }
        $scope.deletesHouse = function (HouseDetail) {
            $scope.isLoading = true;
            HouseService.deleteHouse(HouseDetail.HID, successCallBack, failureCallBack);
        }
        $scope.addHouse = function (HouseDetail) {
            $scope.isLoading = true;
            HouseService.addHouse(HouseDetail, successCallBack, failureCallBack);
        }
        $scope.updateHouse = function (HouseDetail)
        {
            $scope.isLoading = true;
            HouseService.updateHouse(HouseDetail, successCallBack, failureCallBack);
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getHouseDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.HouseDetails = data;
                        $("#EditHouseModel .close").click();
                        break;
                    }
                    break;
                case 'addHouse':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditHouseModel .close").click();
                        break;
                    }
                    break;
                case 'updateHouse':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditHouseModel .close").click();
                        break;
                    }
                    break;
                case 'deleteHouse':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditHouseModel .close").click();
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getHouseDetails':
                    $scope.isLoading = false;
                    break;
                case 'addHouse':
                    $scope.isLoading = false;
                    break;
                case 'updateHouse':
                    $scope.isLoading = false;
                    break;
                case 'deleteHouse':
                    $scope.isLoading = false;
                    break;
            }
        };
    }
})();



