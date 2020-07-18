(function () {
    'use strict';
    var controllerId = 'StudentDetailsCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
            'StudentDetailservice',
         'HobbyService',
         'Excel',
         '$timeout',
         'CommonSrvc',
          StudentCtlr
        ]);

    function StudentCtlr($scope, StudentDetailservice, HobbyService,Excel,$timeout,CommonSrvc) {
        
        $scope.heading = "Student";
        $scope.subheading = "Details";
        $scope.currentPage = 1;
        $scope.pageSize = 20;
        $scope.SelectedClass
            = { Class1: 'Nursery', CID: 4 };
        $scope.moment = moment;
        $scope.isLoading = true;
        StudentDetailservice.getStudentDetails(successCallBack, failureCallBack);
        

        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete;
            $scope.selectedStudent = item;
            assignClass(item.Class);
            $scope.selectedStudent.RouteObj = { Charge: item.Transport_Charge, Route: item.Route, TId: item.TId, TransportType: item.TransportType }
            assignTransport($scope.selectedStudent.RouteObj);
            setHouse(item.House_Name);
            setHobby(item.Hobby);
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

            if (typeof $scope.selectedStudent.House != "undefined" && $scope.selectedStudent.House != "" && $scope.selectedStudent.House != null) {
                studentDetail.House_Name = $scope.selectedStudent.House.HID;
            }
            
            if (typeof $scope.selectedStudent.Hobby != "undefined" && $scope.selectedStudent.Hobby != "" && $scope.selectedStudent.Hobby != null) {
                studentDetail.Hobby = $scope.selectedStudent.Hobby.Id;
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

        function setHouse(houseId) {
            var i = 0;
            angular.forEach($scope.Houses, function (value, key) {
                if (value.HID === parseInt(houseId)) {
                    $scope.selectedStudent.House = value;
                }
                i = i + 1;
            });
        }

        function setHobby(Id) {
            var i = 0;
            angular.forEach($scope.HobbyDetails, function (value, key) {
                if (value.Id === parseInt(Id)) {
                    $scope.selectedStudent.Hobby = value;
                }
                i = i + 1;
            });
        }

        function successCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        CommonSrvc.getSchool(successCallBack, failureCallBack);
                        StudentDetailservice.getAllClass(successCallBack, failureCallBack);
                        CommonSrvc.getTransportCharge(successCallBack, failureCallBack);
                        CommonSrvc.getStudentHouse(successCallBack, failureCallBack);
                        HobbyService.getHobbyDetails(successCallBack, failureCallBack);
                        $scope.studentDetails = data;
                        break;
                    }
                    break;
                case 'updateStudent':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        //alert("Update Student Successfully. " + data);
                        $("#EditStudentDetailModel .close").click();
                        break;
                    }
                    break;
                case 'GetClass':
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'getSchool':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.schoolDetails = data[0];
                        break;
                    }
                    break;
                case 'deleteStudent':
                    
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        alert("Student deleted Successfully. " + data);
                        $("#EditStudentDetailModel .close").click();
                        break;
                    }
                    break;
                case 'getTransportCharge':
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.getTransportCharge = data;
                        break;
                    }
                    break;
                case 'getStudentHouse':
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.Houses = data;
                        break;
                    }
                    break;
                case 'uploadFileToUrl':
                    
                    if (typeof data !== 'undefined' && data != null) {
                        console.log(data);
                    }
                    break;
                case 'getHobbyDetails':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.HobbyDetails = data;
                        break;
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
                    
                    if (typeof data !== 'undefined' && data != null) {
                        console.log(data);
                    }
                    break;
                case 'getStudentHouse':
                    alert("Error Occured during getStudentHouse. " + data);
                    break;
                case 'getHobbyDetails':
                    $scope.isLoading = false;
                    break;

            }
        };
    }
})();



