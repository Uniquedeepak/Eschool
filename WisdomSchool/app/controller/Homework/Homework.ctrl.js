﻿(function () {
    'use strict';
    var controllerId = 'HomeworkCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'HomeworkService',
         'CommonSrvc',
          
          HomeworkCtlrFn
        ]);
    function HomeworkCtlrFn($scope, HomeworkService,CommonSrvc) {
        $scope.heading = "Homework";
        $scope.homeworkImg = "";
        $scope.subheading = "Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            CommonSrvc.monthList(successCallBack, failureCallBack);
            CommonSrvc.getAllClass(successCallBack, failureCallBack);
            HomeworkService.getHomeworkDetails(successCallBack, failureCallBack);
        }
       
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete === 3;
            $scope.crud = isDelete;

            if (item)
                assignClass(item.class);
            else
                assignClass("NURSERY");
            
            $scope.selectedHomework = item;
            $("#EditHomeworkModel").modal();
        }
        $scope.deletesHomework = function (HomeworkDetail) {
            $scope.isLoading = true;
            HomeworkService.deleteHomework(HomeworkDetail.id, successCallBack, failureCallBack);
        }
        $scope.addHomework = function (HomeworkDetail) {
            $scope.isLoading = true;
            HomeworkDetail.class = $scope.SelectedClass.CID;
            HomeworkDetail.month = HomeworkDetail.month;
            HomeworkService.addHomework(HomeworkDetail, HomeworkDetail.data, successCallBack, failureCallBack);
        }

        $scope.updateHomework = function (HomeworkDetail)
        {
            $scope.isLoading = true;
            HomeworkDetail.class = $scope.SelectedClass.CID;
            HomeworkDetail.month = HomeworkDetail.month;
            HomeworkService.updateHomework(HomeworkDetail, HomeworkDetail.data, successCallBack, failureCallBack);
        }
        $scope.downloadHomework = function (Id) {
            $scope.isLoading = true;
            HomeworkService.downloadHomework(Id, successCallBack, failureCallBack);
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
                case 'getHomeworkDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.HomeworkDetails = data;
                        $("#EditHomeworkModel .close").click();
                        break;
                    }
                    break;
                case 'addHomework':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditHomeworkModel .close").click();
                        break;
                    }
                    break;
                case 'updateHomework':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditHomeworkModel .close").click();
                        break;
                    }
                    break;
                case 'deleteHomework':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditHomeworkModel .close").click();
                        break;
                    }
                    break;
                case 'downloadHomework':
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
                case 'getHomeworkDetails':
                    $scope.isLoading = false;
                    break;
                case 'updateHomework':
                    $scope.isLoading = false;
                    break;
                case 'deleteHomework':
                    $scope.isLoading = false;
                    break;
                case 'downloadHomework':
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



