(function () {
    'use strict';
    var controllerId = 'NotificationCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'NotificationService',
         'CommonSrvc',
          
          NotificationCtlrFn
        ]);
    function NotificationCtlrFn($scope, NotificationService,CommonSrvc) {
        $scope.heading = "Notification Detail";
        $scope.NotificationImg = "";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            CommonSrvc.getAllClass(successCallBack, failureCallBack);
            NotificationService.getNotificationDetails(successCallBack, failureCallBack);
        }
       
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete === 3;
            $scope.crud = isDelete;

            if (item)
                assignClass(item.Class);
            else
                assignClass("NURSERY");
            
            $scope.selectedNotification = item;
            $("#EditNotificationModel").modal();
        }
        $scope.deletesNotification = function (NotificationDetail) {
            $scope.isLoading = true;
            NotificationService.deleteNotification(NotificationDetail.Id, successCallBack, failureCallBack);
        }
        $scope.addNotification = function (NotificationDetail) {
            $scope.isLoading = true;
            NotificationDetail.class = $scope.SelectedClass.CID;
            NotificationService.addNotification(NotificationDetail, successCallBack, failureCallBack);
        }
        $scope.updateNotification = function (NotificationDetail)
        {
            $scope.isLoading = true;
            NotificationDetail.class = $scope.SelectedClass.CID;
            NotificationService.updateNotification(NotificationDetail, successCallBack, failureCallBack);
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
                case 'getNotificationDetails':
                    $scope.isLoading = false;
                    if (data && data.ResponseCode === "200") {
                        $scope.NotificationDetails = data.Result;
                        $("#EditNotificationModel .close").click();
                        break;
                    }
                    break;
                case 'addNotification':
                    $scope.isLoading = false;
                    if (data) {
                        activate();
                        $("#EditNotificationModel .close").click();
                        break;
                    }
                    break;
                case 'updateNotification':
                    $scope.isLoading = false;
                    if (data) {
                        activate();
                        $("#EditNotificationModel .close").click();
                        break;
                    }
                    break;
                case 'deleteNotification':
                    $scope.isLoading = false;
                    if (data) {
                        activate();
                        $("#EditNotificationModel .close").click();
                        break;
                    }
                    break;
                case 'downloadNotification':
                    $scope.isLoading = false;
                    if (data) {
                        break;
                    }
                    break;
                case 'GetClass':
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'monthList':
                    if (data) {
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
                case 'getNotificationDetails':
                    $scope.isLoading = false;
                    break;
                case 'updateNotification':
                    $scope.isLoading = false;
                    break;
                case 'deleteNotification':
                    $scope.isLoading = false;
                    break;
                case 'downloadNotification':
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



