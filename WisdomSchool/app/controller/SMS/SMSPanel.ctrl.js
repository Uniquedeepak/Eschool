(function () {
    'use strict';
    var controllerId = 'SMSPanelCtrl';

    var myApp = angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'Excel',
         '$timeout',
         'CommonSrvc',
          
         '$location',
          SMSPanelCtrlFn
        ]);

    function SMSPanelCtrlFn($scope, Excel, $timeout, CommonSrvc, $location) {
        $scope.heading = "SMS Panel";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.moment = moment;
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
        $scope.isStudent = true;
        $scope.isLoading = false;
        $scope.SelectedClass = "-1";
        CommonSrvc.getAllClass(successCallBack, failureCallBack);
        $scope.sendSMSByUser = function ()
        {
            var user = $scope.isStudent === false ? 2:1;
            CommonSrvc.SendSMSByUser($scope.smsTextArea, user, $scope.SelectedClass, successCallBack, failureCallBack);
        }

        $scope.onClassChange = function (classId) {
            $scope.SelectedClass = classId;
        }
        

        function successCallBack(call, data) {
            switch (call) {
                case 'SendSMSByUser':
                    $scope.isLoading = false;
                    if (data) {
                        alert(data);
                        break;
                    }
                    break;
                case 'sendTextSMS':
                    //
                    if (data) {
                        console.log(data);
                        break;
                    }
                    break;
                case 'GetClass':
                    //
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'SendSMSByUser':
                    $scope.isLoading = false;
                    break;
                case 'GetClass':
                    $scope.isLoading = false;
                    break;
                case 'sendTextSMS':
                    if (data) {
                        console.log(data)
                        break;
                    }
                    break;


            }
        };
    }

})();



