(function () {
    'use strict';
    var controllerId = 'ClassCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'ClassService',
          
          ClassCtlr
        ]);
    function ClassCtlr($scope, ClassService) {
        $scope.heading = "Classes Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            ClassService.getClassDetails(successCallBack, failureCallBack);
        }
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete;
            $scope.selectedClass = item;
            $("#EditClassModel").modal();
        }
        $scope.deletesClass = function (ClassDetail) {
            $scope.isLoading = true;
            ClassService.deleteClass(ClassDetail.CID, successCallBack, failureCallBack);
        }
        $scope.updateClass = function (ClassDetail)
        {
            $scope.isLoading = true;
            //Todo:
            //$scope.msgTitle = 'Alert';
            //$scope.msgBody = 'The Tomatoes Exploded!';
            //$scope.msgType = 'warning';

            //$scope.flash = flash;
            //flash.pop({ title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType });

            ClassService.updateClass(ClassDetail, successCallBack, failureCallBack);
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getClassDetails':
                    
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.ClassDetails = data;
                        $("#EditClassModel .close").click();
                        break;
                    }
                    break;
                case 'updateClass':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $("#EditClassModel .close").click();
                        break;
                    }
                    break;
                case 'deleteClass':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getClassDetails':
                    $scope.isLoading = false;
                    
                    break;
                case 'updateClass':
                    $scope.isLoading = false;
                    
                    break;
                case 'deleteClass':
                    $scope.isLoading = false;
                    
                    break;
            }
        };
    }
})();



