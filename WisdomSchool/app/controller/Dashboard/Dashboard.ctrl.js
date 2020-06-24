(function () {
    'use strict';
    var controllerId = 'DashboardCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'DashboardService',
         'CommonSrvc',
          
          DashboardCtlr
        ]);
    function DashboardCtlr($scope, DashboardService,CommonSrvc) {
        $scope.heading = "Classes Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            DashboardService.getTotalClassStudent(successCallBack, failureCallBack);
            CommonSrvc.getCurrentUser(successCallBack, failureCallBack);
            DashboardService.getCountStudent(successCallBack, failureCallBack);
            CommonSrvc.getSchool(successCallBack, failureCallBack);
        }
        $scope.Logout = function()
        {
            CommonSrvc.logOut(successCallBack, failureCallBack);
        }
        $scope.BackUp = function () {
            DashboardService.backUp(successCallBack, failureCallBack);
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getCurrentUser':
                    $scope.isLoading = false;
                    
                    if (data) {
                        $scope.CurrentUser = data;
                        break;
                    }
                    break;
                case 'logOut':
                    
                    break;
                case 'backUp':
                    alert(data);
                    break;
                case 'getCountStudent':
                    $scope.isLoading = false;
                    
                    if (data) {
                        $scope.TotalStudents = data;
                        DashboardService.getCountClass(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'getCountClass':
                    
                    $scope.isLoading = false;
                    if (data) {
                        $scope.TotalClass = data;
                        DashboardService.getMonthFees(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'getMonthFees':
                    
                    $scope.isLoading = false;
                    if (data) {
                        $scope.MonthTotalFee = data;
                        DashboardService.geTodayFees(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'geTodayFees':
                    $scope.isLoading = false;
                    if (data) {
                        $scope.TodayTotalFee = data;
                        break;
                    }
                    break;
                case 'getTotalClassStudent':
                    DashboardService.getMonthBirthday(successCallBack, failureCallBack);
                    if (data) {
                        setTotalClassStudentChartData(data);
                    }
                    break;
                case 'getMonthBirthday':
                    DashboardService.getClassFeeBalance(successCallBack, failureCallBack);
                    if (data) {
                        setMonthBirthdayChartData(data);
                    }
                    break;
                case 'getClassFeeBalance':
                    CommonSrvc.getTransportCharge(successCallBack, failureCallBack);
                    if (data) {
                        setClassFeeBalanceChartData(data);
                    }
                    break;
                case 'getTransportCharge':
                    $scope.isLoading = false;
                    if (data) {
                        setTransportChargeChartData(data);
                    }
                    break;
                case 'getSchool':
                    $scope.isLoading = false;
                    if (data) {
                        $scope.schoolDetails = data[0];
                        break;
                    }
                    break;
                    
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getCurrentUser':
                    $scope.isLoading = false;
                    
                    break;
                case 'logOut':
                    
                    $scope.isLoading = false;
                    break;
                case 'backUp':
                    $scope.isLoading = false;
                    alert("Error during database backup.");
                    break;
                case 'getClassDetails':
                    $scope.isLoading = false;
                    
                    break;
                case 'updateClass':
                    $scope.isLoading = false;
                    
                    break;
                case 'deleteClass':
                    $scope.isLoading = false;
                    
                    break;
                case 'getTotalClassStudent':
                    $scope.isLoading = false;
                    
                    break;
                case 'getMonthBirthday':
                    $scope.isLoading = false;
                    
                    break;
                case 'getClassFeeBalance':
                    $scope.isLoading = false;
                    
                    break;
                case 'getTransportCharge':
                    $scope.isLoading = false;
                    
                    break;
                case 'getSchool':
                    $scope.isLoading = false;
                    alert("Error Occured during getSchool. " + data);
                    break;
            }
        };
        function setTotalClassStudentChartData(dataList)
        {
            $scope.Studentlabels = "";
            $scope.Studentdata = "";
            var Studentlabels = [];
            var Studentdata = [];
            angular.forEach(dataList, function (item) {
                Studentlabels.push(item.Label);
                Studentdata.push(item.Data);
            });
            $scope.Studentlabels = Studentlabels;
            $scope.Studentdata = Studentdata;
        }
        function setMonthBirthdayChartData(dataList) {
            var Birthdaylabels = [];
            var Birthdaydata = [];
            angular.forEach(dataList, function (item) {
                Birthdaylabels.push(item.Label);
                Birthdaydata.push(item.Data);
            });
            $scope.Birthdaylabels = Birthdaylabels;
            $scope.Birthdaydata = Birthdaydata;
        }
        function setClassFeeBalanceChartData(dataList) {
            $scope.MonthlyFeelabels = "";
            $scope.MonthlyFeedata = "";
            var MonthlyFeelabels = [];
            var MonthlyFeedata = [];
            angular.forEach(dataList, function (item) {
                MonthlyFeelabels.push(item.Label);
                MonthlyFeedata.push(item.Data);
            });
            $scope.MonthlyFeelabels = MonthlyFeelabels;
            $scope.MonthlyFeedata = MonthlyFeedata;
        }
        function setTransportChargeChartData(dataList) {
            
            $scope.Transportlabels = "";
            $scope.Transportdata = "";
            var Transportlabels = [];
            var Transportdata = [];
            angular.forEach(dataList, function (item) {
                Transportlabels.push(item.Route);
                Transportdata.push(item.Charge == "0" ? "1" : item.Charge);
            });
            $scope.Transportlabels = Transportlabels;
            $scope.Transportdata = Transportdata;
        }
    }
})();



