(function () {
    'use strict';
    var controllerId = 'CertificateCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'StudentDetailservice',
         'CommonSrvc',
          
          CertificateCtlr
        ]);
    function CertificateCtlr($scope, StudentDetailservice, CommonSrvc) {
        $scope.heading = " ";
        $scope.subheading = "Certificate";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.moment = moment;
        $scope.date = new Date();
        activate();
        function activate() {
            $scope.isLoading = true;
            StudentDetailservice.getStudentDetails(successCallBack, failureCallBack);
        }
        $scope.openBirth = function (item) {
            
            $scope.selectedStudent = item;
            $scope.selectedStudent.DOB = item.DOB;
            $("#BirthModel").modal();
        }
        $scope.openLeaving = function (item) {
            
            $scope.selectedStudent = item;
            $scope.selectedStudent.DOB = item.DOB;
            $("#LeavingModel").modal();
        }
        $scope.openTransfer = function (item) {
            
            $scope.selectedStudent = item;
            $scope.selectedStudent.DOB = item.DOB;
            $("#TransferModel").modal();
        }
        $scope.Confirm = function(selectedStudent)
        {
            //alert(AdmissionNo);
            $scope.isLoading = true;
            selectedStudent.Status = "1";
            StudentDetailservice.updateStudent(selectedStudent,successCallBack, failureCallBack);
        }
        $scope.printDiv = function (divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=300,height=300');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" /><style>.table > tbody > tr > td {padding:1px !important;}</style></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.studentDetails = data;
                        CommonSrvc.getSchool(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'updateStudent':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        //alert("Update Student Successfully. " + data);
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
                case 'getSchool':
                    
                    $scope.isLoading = false;
                    alert("Error Occured during getSchool. " + data);
                    break;
            }
        };
    }
})();



