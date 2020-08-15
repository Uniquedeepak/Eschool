(function () {
    'use strict';
    var controllerId = 'LiveClassCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'LiveClassService',
         'CommonSrvc',
          
          LiveClassCtlrFn
        ]);
    function LiveClassCtlrFn($scope, LiveClassService,CommonSrvc) {
        $scope.heading = "Live Class";
        $scope.LiveClassImg = "";
        $scope.subheading = "Details";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            CommonSrvc.getAllClass(successCallBack, failureCallBack);
            LiveClassService.getLiveClassDetails(successCallBack, failureCallBack);
        }
       
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete === 3;
            $scope.crud = isDelete;

            if (item)
                assignClass(item.Class);
            else
                assignClass("NURSERY");
            
            $scope.selectedLiveClass = item;
            $("#EditLiveClassModel").modal();
        }
        $scope.deletesLiveClass = function (LiveClassDetail) {
            $scope.isLoading = true;
            LiveClassService.deleteLiveClass(LiveClassDetail.Id, successCallBack, failureCallBack);
        }
        $scope.addLiveClass = function (LiveClassDetail) {
            $scope.isLoading = true;
            LiveClassDetail.class = $scope.SelectedClass.CID;
            LiveClassService.addLiveClass(LiveClassDetail, successCallBack, failureCallBack);
        }
        $scope.updateLiveClass = function (LiveClassDetail)
        {
            $scope.isLoading = true;
            LiveClassDetail.class = $scope.SelectedClass.CID;
            LiveClassService.updateLiveClass(LiveClassDetail, successCallBack, failureCallBack);
        }
        function assignClass(Class) {
            var i = 0;
            angular.forEach($scope.Classes, function (value, key) {
                if (value.CID === parseInt(Class)) {
                    $scope.SelectedClass = value;
                }
                i = i + 1;
            });
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getLiveClassDetails':
                    $scope.isLoading = false;
                    if (data && data.ResponseCode === "200") {
                        $scope.LiveClassDetails = data.Result;
                        $("#EditLiveClassModel .close").click();
                        break;
                    }
                    break;
                case 'addLiveClass':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditLiveClassModel .close").click();
                        break;
                    }
                    break;
                case 'updateLiveClass':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditLiveClassModel .close").click();
                        break;
                    }
                    break;
                case 'deleteLiveClass':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditLiveClassModel .close").click();
                        break;
                    }
                    break;
                case 'downloadLiveClass':
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
                case 'getLiveClassDetails':
                    $scope.isLoading = false;
                    break;
                case 'updateLiveClass':
                    $scope.isLoading = false;
                    break;
                case 'deleteLiveClass':
                    $scope.isLoading = false;
                    break;
                case 'downloadLiveClass':
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



