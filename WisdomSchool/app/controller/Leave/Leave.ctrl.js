(function () {
    'use strict';
    var controllerId = 'LeaveCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'LeaveService',
         'CommonSrvc',
          
          LeaveCtlrFn
        ]);
    function LeaveCtlrFn($scope, LeaveService,CommonSrvc) {
        $scope.heading = "Student's";
        $scope.LeaveImg = "";
        $scope.subheading = "Leave";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            CommonSrvc.getAllClass(successCallBack, failureCallBack);
            LeaveService.getLeaveDetails(successCallBack, failureCallBack);
        }
       
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete === 3;
            $scope.crud = isDelete;

            if (item)
                assignClass(item.Class);
            else
                assignClass("NURSERY");
            
            $scope.selectedLeave = item;
            $("#EditLeaveModel").modal();
        }
        $scope.deletesLeave = function (LeaveDetail) {
            $scope.isLoading = true;
            LeaveService.deleteLeave(LeaveDetail.Id, successCallBack, failureCallBack);
        }
        $scope.addLeave = function (LeaveDetail) {
            $scope.isLoading = true;
            LeaveService.addLeave(LeaveDetail, successCallBack, failureCallBack);
        }
        $scope.updateLeave = function (LeaveDetail)
        {
            $scope.isLoading = true;
            LeaveService.updateLeave(LeaveDetail, successCallBack, failureCallBack);
        }
        function assignClass(Class) {
            var i = 0;
            angular.forEach($scope.Classes, function (value, key) {
                if (value.CID === Class) {
                    $scope.SelectedClass = value;
                }
                i = i + 1;
            });
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getLeaveDetails':
                    $scope.isLoading = false;
                    if (data && data.ResponseCode === "200") {
                        $scope.LeaveDetails = data.Result;
                        $("#EditLeaveModel .close").click();
                        break;
                    }
                    break;
                case 'addLeave':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditLeaveModel .close").click();
                        break;
                    }
                    break;
                case 'updateLeave':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditLeaveModel .close").click();
                        break;
                    }
                    break;
                case 'deleteLeave':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditLeaveModel .close").click();
                        break;
                    }
                    break;
                case 'downloadLeave':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        break;
                    }
                    break;
                case 'GetClass':
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'monthList':
                    if (typeof data !== 'undefined' && data != null) {
                        var monthFeeHeads = [];
                        angular.forEach(data, function (value, key) {
                            monthFeeHeads.push(value.Month1);
                        });
                        $scope.monthFeeHeads = monthFeeHeads;
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getLeaveDetails':
                    $scope.isLoading = false;
                    break;
                case 'updateLeave':
                    $scope.isLoading = false;
                    break;
                case 'deleteLeave':
                    $scope.isLoading = false;
                    break;
                case 'downloadLeave':
                    $scope.isLoading = false;
                    break;
                case 'GetClass':
                    $scope.isLoading = false;
                    break;
                case 'monthList':
                    $scope.isLoading = false;
                    break;
            }
        };
    }
})();



