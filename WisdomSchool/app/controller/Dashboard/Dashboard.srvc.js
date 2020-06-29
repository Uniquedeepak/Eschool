(function () {
    'use strict';
    var ServiceId = 'DashboardService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', DashboardserviceFunc]);
    function DashboardserviceFunc($rootScope, $httpProvider, toaster, $q) {
        var service = {
            getCountClass: null,
            getCountStudent: null,
            getMonthFees: null,
            getTotalClassStudent: null,
            getMonthBirthday: null,
            getClassFeeBalance: null,
            geTodayFees: null,
            getTotalFee: null,
            backUp: null
        };
        //GetTotalClassStudent
        service.getTotalClassStudent = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetTotalClassStudent',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                
                successCallBack('getTotalClassStudent', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getTotalClassStudent", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getTotalClassStudent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getMonthBirthday = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetMonthBirthday',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                
                successCallBack('getMonthBirthday', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getMonthBirthday", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getMonthBirthday', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getClassFeeBalance = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetClassFeeBalance',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                
                successCallBack('getClassFeeBalance', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getClassFeeBalance", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getClassFeeBalance', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getCountClass = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetCountClass',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getCountClass', data);
                //toaster.pop('success', "GetClassDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "getCountClass", "Completed", 2000);
                    failureCallBack('getCountClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.getCountStudent = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetCountStudent',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getCountStudent', data);
                //toaster.pop('success', "GetClassDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "getCountStudent", "Completed", 2000);
                    failureCallBack('getCountStudent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.getMonthFees = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetMonthFees',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getMonthFees', data);
                //toaster.pop('success', "GetClassDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "getMonthFees", "Completed", 2000);
                    failureCallBack('getMonthFees', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.geTodayFees = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GeTodayFees',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('geTodayFees', data);
                //toaster.pop('success', "GetClassDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "geTodayFees", "Completed", 2000);
                    failureCallBack('geTodayFees', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.getTotalFee = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetTotalFee',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getTotalFee', data);
                //toaster.pop('success', "GetClassDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "getTotalFee", "Completed", 2000);
                    failureCallBack('getTotalFee', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.backUp = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/BackUpDB',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('backUp', data);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "backUp", "Completed", 2000);
                    failureCallBack('backUp', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        return service;
    }
})();