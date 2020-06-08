(function () {
    'use strict';
    var controllerId = 'StudentDetailsCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'StudentDetailservice',
         'Excel',
         '$timeout',
         'CommonSrvc',
          StudentCtlr
        ]);

    function StudentCtlr($scope, StudentDetailservice,Excel,$timeout,CommonSrvc) {
        
        $scope.heading = "Student";
        $scope.subheading = "Details";
        $scope.currentPage = 1;
        $scope.pageSize = 20;
        $scope.SelectedClass
            = { Class1: 'Nursery', CID: 4 };
        $scope.moment = moment;
        $scope.isLoading = true;
        StudentDetailservice.getStudentDetails(successCallBack, failureCallBack);
        StudentDetailservice.getAllClass(successCallBack, failureCallBack);
        CommonSrvc.getTransportCharge(successCallBack, failureCallBack);

        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete;
            $scope.selectedStudent = item;
            assignClass(item.Class);
            $scope.selectedStudent.RouteObj = { Charge: item.Transport_Charge, Route: item.Route, TId: item.TId, TransportType: item.TransportType }
            assignTransport($scope.selectedStudent.RouteObj);
            
            //var FromDate = new Date();
            $scope.selectedStudent.DOB = item.DOB;
            $("#EditStudentDetailModel").modal();
            
        }
        $scope.View = function (isDelete, item) {

            $scope.disableCtrl = isDelete;
            $scope.selectedStudent = item;
            assignClass(item.Class);
            $scope.selectedStudent.RouteObj = { Charge: item.Transport_Charge, Route: item.Route, TId: item.TId, TransportType: item.TransportType }
            assignTransport($scope.selectedStudent.RouteObj);

            //var FromDate = new Date();
            $scope.selectedStudent.DOB = item.DOB;
            $("#StudentViewModel").modal();
        }

        $scope.exportToExcel = function (tableId) { // ex: '#my-table'
            $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
            $timeout(function () { location.href = $scope.exportHref; }, 100); // trigger download
        }

        $scope.printDiv = function (divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=300,height=300');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }

        $scope.deletestudent = function (studentDetail) {
            $scope.isLoading = true;
            StudentDetailservice.deleteStudent(studentDetail.AdmissionId, successCallBack, failureCallBack);
        }

        $scope.updateStudent = function(studentDetail)
        {
            
            $scope.isLoading = true;
            if (typeof $scope.selectedStudent.RouteObj != 'undefined')
            {
                studentDetail.Route = $scope.selectedStudent.RouteObj.Route;
                studentDetail.Transport_Charge = $scope.selectedStudent.RouteObj.Charge;
            }
            if (typeof studentDetail.Image != "undefined" && studentDetail.Image != "" && studentDetail.Image != null)
            {
                CommonSrvc.uploadFileToUrl(studentDetail.Image, successCallBack, failureCallBack);
                studentDetail.Image = studentDetail.Image.name;
            }
                    
            studentDetail.Class = $scope.SelectedClass.CID;
            StudentDetailservice.updateStudent(studentDetail,successCallBack, failureCallBack);
        }

        $scope.getPartial = function () {
            return 'D:\Deepak\WisdomSchoolApp\WisdomSchool\app\controller\Student\StViewDetails.html';
        }

        $scope.$watch("selectedStudent.Route", function (newValue, oldValue) {
            
            if (typeof $scope.selectedStudent != 'undefined')
            {
                if (typeof $scope.selectedStudent.Route.Charge != 'undefined' && typeof $scope.selectedStudent.Route.Route != 'undefined') {
                    $scope.selectedStudent.Transport_Charge = $scope.selectedStudent.Route.Charge;
                    $scope.selectedStudent.Route = $scope.selectedStudent.Route.Route;
                    selectedStudent.RouteObj = { Route: $scope.selectedStudent.Route, Charge: $scope.selectedStudent.Transport_Charge }
                }
            }
           
            
        });

        function assignTransport(RouteObj)
        {
            var i = 0;
            angular.forEach($scope.getTransportCharge, function (value, key) {
                if (value.Route === RouteObj.Route) {
                    $scope.selectedStudent.RouteObj = value;
                }
                i = i + 1;
            });
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
                case 'getStudentDetails':
                    $scope.isLoading = false;
                    
                    if (data) {
                        CommonSrvc.getSchool(successCallBack, failureCallBack);
                        $scope.studentDetails = data;
                        break;
                    }
                    break;
                case 'updateStudent':
                    $scope.isLoading = false;
                    
                    if (data) {
                        //alert("Update Student Successfully. " + data);
                        $("#EditStudentDetailModel .close").click();
                        break;
                    }
                    break;
                case 'GetClass':
                    
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'getSchool':
                    $scope.isLoading = false;

                    if (data) {
                        $scope.schoolDetails = data[0];
                        break;
                    }
                    break;
                case 'deleteStudent':
                    
                    $scope.isLoading = false;
                    if (data) {
                        alert("Student deleted Successfully. " + data);
                        $("#EditStudentDetailModel .close").click();
                        break;
                    }
                    break;
                case 'getTransportCharge':
                    
                    if (data) {
                        $scope.getTransportCharge = data;
                        break;
                    }
                    break;
                case 'uploadFileToUrl':
                    
                    if (data) {
                        console.log(data);
                    }
                    break;
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    
                    $scope.isLoading = false;
                    alert("Error Occured during getStudentDetails. " + data);
                    break;
                case 'updateStudent':
                    
                    $scope.isLoading = false;
                    alert("Error Occured during updateStudent. " + data);
                    break;
                case 'deleteStudent':
                    
                    $scope.isLoading = false;
                    alert("Error Occured during deleteStudent. " + data);
                    break;
                case 'getSchool':

                    $scope.isLoading = false;
                    alert("Error Occured during getSchool. " + data);
                    break;
                case 'getTransportCharge':
                    
                    alert("Error Occured during getTransportCharge. " + data);
                    break;
                case 'uploadFileToUrl':
                    
                    if (data) {
                        console.log(data);
                    }
                    break;
            }
        };
    }
})();



