(function () {
    'use strict';
    var controllerId = 'SchoolCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'SchoolService',
          
          SchoolCtlr
        ]);
    function SchoolCtlr($scope, SchoolService) {
        $scope.heading = "School Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            SchoolService.getSchoolDetails(successCallBack, failureCallBack);
        }
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete;
            $scope.selectedSchool = item;
            $("#EditSchoolModel").modal();
        }
        $scope.deletesSchool = function (SchoolDetail) {
            $scope.isLoading = true;
            SchoolService.deleteSchool(SchoolDetail.ID, successCallBack, failureCallBack);
        }
        $scope.updateSchool = function (SchoolDetail)
        {
            $scope.isLoading = true;
            //Todo:
            //$scope.msgTitle = 'Alert';
            //$scope.msgBody = 'The Tomatoes Exploded!';
            //$scope.msgType = 'warning';

            //$scope.flash = flash;
            //flash.pop({ title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType });

            SchoolService.updateSchool(SchoolDetail, successCallBack, failureCallBack);
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getSchoolDetails':
                    
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.SchoolDetails = data;
                        $("#EditSchoolModel .close").click();
                        break;
                    }
                    break;
                case 'updateSchool':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $("#EditSchoolModel .close").click();
                        break;
                    }
                    break;
                case 'deleteSchool':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getSchoolDetails':
                    $scope.isLoading = false;
                    
                    break;
                case 'updateSchool':
                    $scope.isLoading = false;
                    
                    break;
                case 'deleteSchool':
                    $scope.isLoading = false;
                    
                    break;
            }
        };
    }
})();



