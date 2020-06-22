(function () {
    'use strict';
    var controllerId = 'StAdmissionFormCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'StudentDetailservice',
         'CommonSrvc',
          'SchoolData',
          StAdmissionFormCtrl
        ]);

    function StAdmissionFormCtrl($scope, StudentDetailservice, CommonSrvc, SchoolData) {
        $scope.heading = "Student";
        $scope.subheading = "Admission Form";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.AddStudent = {};
        reset();
        
        $scope.addStudent = function (AddStudent)
        {
            $scope.isLoading = true;
            CommonSrvc.uploadFileToUrl(AddStudent.Image, successCallBack, failureCallBack);
            if (typeof $scope.AddStudent.Image != "undefined" && $scope.AddStudent.Image != "" && $scope.AddStudent.Image != null)
            {
                $scope.AddStudent.Image = AddStudent.Image.name;
            }
            else
            {
                $scope.AddStudent.Image = "NoImage.png";
            }
            
            $scope.AddStudent.Class = $scope.SelectedClass.CID;
            $scope.AddStudent.Route = $scope.AddStudent.Route.Route;
            $scope.AddStudent.House_Name = $scope.AddStudent.House.HID;
            StudentDetailservice.addStudent(AddStudent, successCallBack, failureCallBack);
        }

        function reset()
        {
            $scope.AddStudent.Medium = "English";
            $scope.AddStudent.Section = "A";
            $scope.AddStudent.Gender = "Male";
            $scope.AddStudent.BloodGroup = "B+";
            $scope.AddStudent.Category = "General";
            $scope.AddStudent.Religion = "Hindu";
            $scope.moment = moment;
            $scope.AddStudent.date = new Date();
            $scope.AddStudent.DOB = new Date();
            $scope.SelectedClass = { Class1: 'Nursery', CID: 1 };
            $scope.AddStudent.AdmissionNo = "";
            $scope.AddStudent.Adhar_No = "";
            $scope.AddStudent.EmailId = "";
            $scope.AddStudent.StFirstName = "";
            $scope.AddStudent.MotherName = "";
            $scope.AddStudent.FatherName = "";
            $scope.AddStudent.PreviousDue = "0";
            $scope.AddStudent.Concession = "0";
            $scope.AddStudent.ComAddress = "";
            $scope.AddStudent.ParAddress = "";
            $scope.AddStudent.EmergencyNo = "";
            $scope.AddStudent.Contact = "";
            $scope.AddStudent.UserName = "";
            $scope.AddStudent.Password = "";
            $scope.AddStudent.RTE = "";
            $scope.AddStudent.PreviousSchool = "";
            $scope.AddStudent.Nationality = "Indian";
            $scope.AddStudent.Ocupation = "";
            $scope.AddStudent.MotherTougue = "Hindi";
            $scope.AddStudent.Disadvantage = "No";
            $scope.AddStudent.TypeOfdisability = "";
            $scope.AddStudent.House_Name = "";
            $scope.AddStudent.Image = "NoImage.png";
            CommonSrvc.CurrentSession(successCallBack, failureCallBack);
            StudentDetailservice.getAdmissionNo(successCallBack, failureCallBack);
            StudentDetailservice.getAllClass(successCallBack, failureCallBack);
            CommonSrvc.getTransportCharge(successCallBack, failureCallBack);
            CommonSrvc.getStudentHouse(successCallBack, failureCallBack);
        }

        function successCallBack(call, data) {
            switch (call) {
                case 'addStudent':
                    
                    $scope.isLoading = false;
                    if (data) {
                        if (typeof data ==='string') {
                            alert(data);
                            break;
                        }
                        reset();
                        break;
                    }
                    break;
                case 'getAdmissionNo':
                    
                    if (data) {
                        $scope.AddStudent.AdmissionNo = parseInt(data) + 1;
                        break;
                    }
                    break;
                case 'GetClass':
                    
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'getTransportCharge':
                    
                    if (data) {
                        $scope.getTransportCharge = data;
                        var index = getIndex($scope.getTransportCharge);
                        $scope.AddStudent.Route = $scope.getTransportCharge[index];
                        break;
                    }
                    break;
                case 'getStudentHouse':
                    if (data) {
                        $scope.Houses = data;
                        $scope.AddStudent.House = $scope.Houses[0];
                        break;
                    }
                    break;
                case 'CurrentSession':
                    if (data) {
                        $scope.AddStudent.ESession = data;
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
                case 'addStudent':
                    
                    $scope.isLoading = false;
                    alert("Error Occured during getStudentDetails. " + data);
                    break;
                case 'getAdmissionNo':
                    
                    $scope.isLoading = false;
                    alert("Error Occured during getAdmissionNo. " + data);
                    break;
                case 'GetClass':
                    
                    alert("Error Occured during GetClass. " + data);
                    break;
                case 'getTransportCharge':
                    
                    alert("Error Occured during GetClass. " + data);
                    break;
                case 'CurrentSession':
                    alert("Error Occured during CurrentSession. " + data);
                    break;
                case 'uploadFileToUrl':
                    
                    if (data) {
                        console.log(data);
                    }
                    break;
                case 'getStudentHouse':
                    alert("Error Occured during getStudentHouse. " + data);
                    break;
               
            }
        };

        function getIndex(list)
        {
            
            for (var i = 0; i < list.length ; i++) {
                if (list[i].Route === "Not Provided") {
                    return i;
                }
            }
        }

        $scope.$watch("AddStudent.Route", function (newValue, oldValue) {
            if (typeof $scope.AddStudent.Route != 'undefined' && $scope.AddStudent.Route != null) {
                $scope.AddStudent.Transport_Charge = $scope.AddStudent.Route.Charge;
            }
            
        });
    }
})();



