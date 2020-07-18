(function () {
    'use strict';
    var controllerId = 'FeeHeadsCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'FeeHeadsService',
         'CommonSrvc',
          
          FeeHeadsCtlr
        ]);
    function FeeHeadsCtlr($scope, FeeHeadsService, CommonSrvc) {
        $scope.heading = "Fee Head Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            CommonSrvc.getAllClass(successCallBack, failureCallBack);
            FeeHeadsService.getFeeHeadsDetails(successCallBack, failureCallBack);
        }
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete===3;
            $scope.crud = isDelete;

            if (item)
                assignClass(item.Class);
            else
                assignClass("NURSERY");

            $scope.selectedFeeHeads = item;
            $("#EditFeeHeadsModel").modal();
        }
        $scope.deletesFeeHeads = function (FeeHeadsDetail) {
            $scope.isLoading = true;
            FeeHeadsService.deleteFeeHeads(FeeHeadsDetail.FID, successCallBack, failureCallBack);
        }
        $scope.addFeeHeads = function (FeeHeadsDetail) {
            $scope.isLoading = true;
            FeeHeadsService.addFeeHeads(FeeHeadsDetail, successCallBack, failureCallBack);
        }
        $scope.updateFeeHeads = function (FeeHeadsDetail)
        {
            $scope.isLoading = true;
            FeeHeadsService.updateFeeHeads(FeeHeadsDetail, successCallBack, failureCallBack);
        }
        function assignClass(Class) {
            var i = 0;
            angular.forEach($scope.Classes, function (value, key) {
                if (value.Class1 === Class) {
                    $scope.SelectedClass = value;
                }
                i = i + 1;
            });
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getFeeHeadsDetails':
                    $scope.isLoading = false;
                    if(typeof data !== 'undefined' && data != null){
                        $scope.FeeHeadsDetails = data;
                        $("#EditFeeHeadsModel .close").click();
                        break;
                    }
                    break;
                case 'addFeeHeads':
                    $scope.isLoading = false;
                    if(typeof data !== 'undefined' && data != null){
                        activate();
                        $("#EditFeeHeadsModel .close").click();
                        break;
                    }
                    break;
                case 'updateFeeHeads':
                    $scope.isLoading = false;
                    if(typeof data !== 'undefined' && data != null){
                        activate();
                        $("#EditFeeHeadsModel .close").click();
                        break;
                    }
                    break;
                case 'deleteFeeHeads':
                    $scope.isLoading = false;
                    if(typeof data !== 'undefined' && data != null){
                        activate();
                        $("#EditFeeHeadsModel .close").click();
                        break;
                    }
                    break;
                case 'GetClass':
                    if(typeof data !== 'undefined' && data != null){
                        $scope.Classes = data;
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getFeeHeadsDetails':
                    $scope.isLoading = false;
                    break;
                case 'addFeeHeads':
                    $scope.isLoading = false;
                    break;
                case 'updateFeeHeads':
                    $scope.isLoading = false;
                    break;
                case 'deleteFeeHeads':
                    $scope.isLoading = false;
                    break;
                case 'GetClass':
                    $scope.isLoading = false;
                    break;
            }
        };
    }
})();



