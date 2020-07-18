(function () {
    'use strict';
    var controllerId = 'TeacherCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'TeacherService',
         'CommonSrvc',
          
          TeacherCtlr
        ]);

    function TeacherCtlr($scope, TeacherService,CommonSrvc) {
        
        $scope.heading = "Teacher Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.selectedTeacher = {};
        $scope.selectedTeacher.Gender = "Male";
        $scope.selectedTeacher.BloodGroup = "B+";
        $scope.selectedTeacher.Category = "General";
        $scope.selectedTeacher.date = new Date();
        $scope.selectedTeacher.DOB = new Date();
        activate();
        function activate() {
            $scope.isLoading = true;
            TeacherService.getTeacherDetails(successCallBack, failureCallBack);
        }
        

        $scope.open = function (flag, item) {
            
            if (flag == 1)
            {
                $scope.selectedTeacher = {};
                $scope.disableCtrl = false;
                $scope.showAdd = true;
                $scope.showEdit = false;
                $scope.showDelete = false;
            }
            else if(flag == 2)
            {
                $scope.disableCtrl = false;
                $scope.showAdd = false;
                $scope.showEdit = true;
                $scope.showDelete = false;
            }
            else if (flag == 3)
            {
                $scope.disableCtrl = true;
                $scope.showAdd = false;
                $scope.showEdit = false;
                $scope.showDelete = true;
            }
            $scope.selectedTeacher = item;
            $("#EditTeacherModel").modal();
        }

        $scope.addTeacher = function (TeacherDetail) {
            $scope.isLoading = true;
            CommonSrvc.uploadTeacehrFileToUrl(TeacherDetail.Image, successCallBack, failureCallBack);
            TeacherDetail.Image = TeacherDetail.Image.name;
            TeacherDetail.DOB = moment(TeacherDetail.DOB).format('MM/DD/YYYY');
            TeacherService.addTeacher(TeacherDetail, successCallBack, failureCallBack);
        }

        $scope.deletesTeacher = function (TeacherDetail) {
            $scope.isLoading = true;
            TeacherDetail.DOB = moment(TeacherDetail.DOB).format('MM/DD/YYYY');
            TeacherService.deleteTeacher(TeacherDetail.EEID, successCallBack, failureCallBack);
        }

        $scope.updateTeacher = function (TeacherDetail)
        {
            $scope.isLoading = true;
            CommonSrvc.uploadTeacehrFileToUrl(TeacherDetail.Image, successCallBack, failureCallBack);
            TeacherDetail.Image = TeacherDetail.Image.name;
            TeacherDetail.DOB = moment(TeacherDetail.DOB).format('MM/DD/YYYY');
            TeacherService.updateTeacher(TeacherDetail, successCallBack, failureCallBack);
        }

        function successCallBack(call, data) {
            switch (call) {
                case 'getTeacherDetails':
                    
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.TeacherDetails = data;
                        $("#EditTeacherModel .close").click();
                        break;
                    }
                    break;
                case 'addTeacher':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $("#EditTeacherModel .close").click();
                        break;
                    }
                    break;
                case 'updateTeacher':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $("#EditTeacherModel .close").click();
                        break;
                    }
                    break;
                case 'deleteTeacher':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $("#EditTeacherModel .close").click();
                        break;
                    }
                    break;
                case 'uploadTeacehrFileToUrl':
                    
                    if (typeof data !== 'undefined' && data != null) {
                        console.log(data);
                    }
                    break;
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getTeacherDetails':
                    $scope.isLoading = false;
                    
                    break;
                case 'addTeacher':
                    $scope.isLoading = false;
                    
                    break;
                case 'updateTeacher':
                    $scope.isLoading = false;
                    
                    break;
                case 'deleteTeacher':
                    $scope.isLoading = false;
                    
                    break;
                case 'uploadTeacehrFileToUrl':
                    
                    if (typeof data !== 'undefined' && data != null) {
                        console.log(data);
                    }
                    break;
            }
        };
    }
})();



