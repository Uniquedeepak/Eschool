(function () {
    'use strict';
    var controllerId = 'FinesCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'FinesService',
          
          FinesCtlrFn
        ]);
    function FinesCtlrFn($scope, FinesService) {
        $scope.heading = "Fine";
        $scope.subheading = "Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            FinesService.getFinesDetails(successCallBack, failureCallBack);
        }
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete===3;
            $scope.crud = isDelete;
            $scope.selectedFines = item;
            $("#EditFinesModel").modal();
        }
        $scope.deletesFines = function (FinesDetail) {
            $scope.isLoading = true;
            FinesService.deleteFines(FinesDetail.Id, successCallBack, failureCallBack);
        }
        $scope.addFines = function (FinesDetail) {
            $scope.isLoading = true;
            FinesService.addFines(FinesDetail, successCallBack, failureCallBack);
        }
        $scope.updateFines = function (FinesDetail)
        {
            $scope.isLoading = true;
            FinesService.updateFines(FinesDetail, successCallBack, failureCallBack);
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getFinesDetails':
                    $scope.isLoading = false;
                    if(typeof data !== 'undefined' && data != null){
                        $scope.FinesDetails = data;
                        $("#EditFinesModel .close").click();
                        break;
                    }
                    break;
                case 'addFines':
                    $scope.isLoading = false;
                    if(typeof data !== 'undefined' && data != null){
                        activate();
                        $("#EditFinesModel .close").click();
                        break;
                    }
                    break;
                case 'updateFines':
                    $scope.isLoading = false;
                    if(typeof data !== 'undefined' && data != null){
                        activate();
                        $("#EditFinesModel .close").click();
                        break;
                    }
                    break;
                case 'deleteFines':
                    $scope.isLoading = false;
                    if(typeof data !== 'undefined' && data != null){
                        activate();
                        $("#EditFinesModel .close").click();
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getFinesDetails':
                    $scope.isLoading = false;
                    break;
                case 'addFines':
                    $scope.isLoading = false;
                    break;
                case 'updateFines':
                    $scope.isLoading = false;
                    break;
                case 'deleteFines':
                    $scope.isLoading = false;
                    break;
            }
        };
    }
})();



