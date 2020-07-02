(function () {
    'use strict';
    var controllerId = 'UserDetailsCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
            'UserDetailservice',
            'StudentDetailservice',
         'Excel',
         '$timeout',
         'CommonSrvc',
          StudentCtlr
        ]);

    function StudentCtlr($scope, UserDetailservice, StudentDetailservice, Excel,$timeout,CommonSrvc) {
        
        $scope.heading = "Create Login";
        $scope.subheading = "Student";
        $scope.currentPage = 1;
        $scope.pageSize = 20;
        $scope.moment = moment;
        $scope.isLoading = true;
        StudentDetailservice.getAllClass(successCallBack, failureCallBack);
      
        $scope.GetStudentByClass = function (Classid) {
            $scope.isLoading = true;
            StudentDetailservice.getStudentsByClass(Classid, successCallBack, failureCallBack);
        };

        $scope.CreateLogin = function (item) {
            $scope.isLoading = true;
            var itemlist = [];
            itemlist.push(item);
            UserDetailservice.createUserLogin(itemlist, successCallBack, failureCallBack);
        }

        $scope.CreateAllLogin = function (list) {
            if (list && list.length > 0) {
                $scope.isLoading = true;
                UserDetailservice.createUserLogin(list, successCallBack, failureCallBack);
            }
            else {
                alert("Please select class.");
            }
        }

        function successCallBack(call, data) {
            switch (call) {
                case 'getStudentsByClass':
                    $scope.isLoading = false;
                    if (data) {
                        CommonSrvc.getSchool(successCallBack, failureCallBack);
                        $scope.studentDetails = data;
                        break;
                    }
                    break;
                case 'GetClass':
                    $scope.isLoading = false;
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'createUserLogin':
                    $scope.isLoading = false;
                    if (data) {
                        break;
                    }
                    break;
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getStudentsByClass':
                    
                    $scope.isLoading = false;
                    alert("Error Occured during getStudentsByClass. " + data);
                    break;
                case 'GetClass':
                    $scope.isLoading = false;
                    alert("Error Occured during GetClass. " + data);
                    break;
                case 'createUserLogin':
                    $scope.isLoading = false;
                    alert("Error Occured during createUserLogin. " + data);
                    break;
            }
        };
    }
})();



