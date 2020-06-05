(function () {
    'use strict';
    var controllerId = 'AttendanceCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'AttendanceService',
         'CommonSrvc',
         'ClassService',
          
          AttendanceCtlr
        ]);

    function AttendanceCtlr($scope, AttendanceService,CommonSrvc,ClassService) {
        $scope.heading = "Attendance Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.selectedAttendance = {};
        activate();
        function activate() {
            $scope.isLoading = true;
            ClassService.getClassDetails(successCallBack, failureCallBack);
            AttendanceService.getStudentDetails(successCallBack, failureCallBack);
        }
        $scope.addStudentAttendance = function () {
            $scope.disableSubmit = true;
            $scope.isLoading = true;
            var StudentToUpdate = [];
            var selectedClass = [];

            for (var key in $scope.filterItems) {
                if ($scope.filterItems[key] === true)
                {
                    selectedClass.push(key);
                }
            }
            
            angular.forEach($scope.StudentDetails, function (student) {
                angular.forEach(selectedClass, function (item)
                {
                    if (student.Class === item) {
                        StudentToUpdate.push({ StAdmId: student.AdmissionId, StAdmNo: student.AdmissionNo, StName: student.StFirstName, StClass: student.Class, StNumber: student.Contact, Attendance: student.Attendance, Date: new Date() });
                    }
                })
                
            });
            $scope.StudentToUpdate = StudentToUpdate;
            AttendanceService.addAttendance($scope.StudentToUpdate, successCallBack, failureCallBack);
            
        };
        function successCallBack(call, data) {
            switch (call) {
                case 'getClassDetails':
                    
                    if (data) {
                        $scope.Classes = data;
                        setStClass();
                        break;
                    }
                    break;
                case 'getStudentDetails':
                    
                    $scope.isLoading = false;
                    if (data) {
                        $scope.StudentDetails = data;
                        $scope.setAttendance();
                        break;
                    }
                    break;
                case 'sendTextSMS':
                    if (data) {
                        console.log(data);
                        break;
                    }
                    break;
                case 'addAttendance':
                    $scope.isLoading = false;
                    if (data) {
                        $scope.disableSubmit = false;
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
                case 'getStudentDetails ':
                    $scope.isLoading = false;
                    console.log(data);
                    break;
                case 'addAttendance ':
                    $scope.isLoading = false;
                    console.log(data);
                    break;
                case 'sendTextSMS':
                    $scope.isLoading = false;
                    break;
            }
        };
        $scope.filterItems = {
            NURSERY: true,
        };
        $scope.testFilter = function (Items) {

            if (typeof $scope.filterItems != 'undefined') {
                return $scope.filterItems[Items.Class];
            }

        };
        function setStClass() {
            var StClassArr = [];
            angular.forEach($scope.Classes, function (StClass)
            {
                StClassArr.push(StClass.Class1);
            });
            $scope.StClass = StClassArr;
            $scope.SelectedClass = StClassArr[0];
        };
        $scope.setAttendance = function()
        {
            angular.forEach($scope.StudentDetails, function (itemVal) {
                itemVal.Attendance = "Present";
            });
        }
    }
})();



