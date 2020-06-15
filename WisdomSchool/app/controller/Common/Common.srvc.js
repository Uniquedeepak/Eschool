(function () {
    'use strict';
    var ServiceId = 'CommonSrvc';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', CommonSrvc]);
    function CommonSrvc($rootScope, $httpProvider, toaster, $q) {
        var service = {
            getTransportCharge: null,
            getCurrentUser: null,
            logOut: null,
            getSchool: null,
            sendSMS: null,
            sendTextSMS: null,
            uploadFileToUrl: null,
            uploadTeacehrFileToUrl: null,
            CurrentSession: null,
            SendSMSByUser: null,
            getAllClass: null,
            smsToAdmin: null,
            monthList: null
        };
        service.getTransportCharge = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetTransportCharge',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('getTransportCharge', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getTransportCharge", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getTransportCharge', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getSchool = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
           $httpProvider({
                method: 'Get',
                url: './Home/GetSchool',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('getSchool', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Get School", "Error", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getSchool', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.CurrentSession = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetActiveSession',
                data: {

                }
            }).success(function (data, status, headers, config) {
                $rootScope.schoolSession = data.substring(1,data.length-1);
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                return successCallBack('CurrentSession', data.substring(1, data.length - 1));
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Current Session", "Error", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    } else {
                        $rootScope.schoolSession = data;
                    }
                   return failureCallBack('CurrentSession', data);
                    //return service.schoolSession;;
                }
                
                //failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getCurrentUser = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Login/GetCurrentUser',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('getCurrentUser', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "getCurrentUser", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('getCurrentUser', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.logOut = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Login/LogOut',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('logOut', data);
                window.location.href = "/Login";
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "logOut", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('logOut', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.sendSMS = function (stName, stClass,number,month,amount,successCallBack, failureCallBack) {
            //var URLwithData = 'http://103.16.142.23/api/mt/SendSMS?user=tsouls&password=123456&senderid=TSOULS&channel=trans&DCS=0&flashsms=0&number=' + number + '&text=Student Name ' + stName + ' Class ' + stClass + ' ,Fee Submitted Successfully for the month ' + month + ' of Amount Rs ' + amount + '.&route=17';
            // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/SendSMS',
                data: {
                    Name: stName,
                    Class: stClass,
                    Number: number,
                    Month: month,
                    Amount: amount
                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('sendSMS', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                //toaster.pop('error', "Send SMS", "Completed", 1000);
                //
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('sendSMS', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.sendTextSMS = function (_msgText,_Number, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'Post',
                url: './SMS/SendTextSMS',
                data: {
                    Text: _msgText,
                    Number: _Number
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "Send SMS ", _Number, 1000);
                successCallBack('sendTextSMS', data);
                //$scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Send SMS failed ", _Number, 1000);
                //
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('sendTextSMS', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.smsToAdmin= function (_msgText, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'Post',
                url: './SMS/SmsToAdmin',
                data: {
                    Text: _msgText,
                }
            }).success(function (data, status, headers, config) {
                if (data) {
                    toaster.pop('success', data, '', 1000);
                    successCallBack('smsToAdmin', data);
                }
                else
                    successCallBack('smsToAdmin', "Data not available");
                
                //$scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Send SMS failed ", '', 1000);
                //
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('smsToAdmin', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.SendSMSByUser = function (_msgText, _user,_classId,successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './SMS/SendSMSByUser',
                data: {
                    Text: _msgText,
                    User: _user,
                    ClassId: _classId
                }
            }).success(function (data, status, headers, config) {
                successCallBack('SendSMSByUser', data);
                //toaster.pop('success', "GetSMSDetails", "Completed", 2000);
                //$scope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "SendSMSByUser", "Completed", 2000);
                    failureCallBack('SendSMSByUser', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.uploadFileToUrl = function (file, successCallBack, failureCallBack) {
            var fd = new FormData();
            fd.append('file', file);
            $httpProvider({
                method: 'Post',
                url: './Home/UploadFiles',
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },
                data:fd
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('uploadFileToUrl', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "uploadFileToUrl", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('uploadFileToUrl', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.uploadTeacehrFileToUrl = function (file, successCallBack, failureCallBack) {
            var fd = new FormData();
            fd.append('file', file);
            $httpProvider({
                method: 'Post',
                url: './Home/UploadTeacherFiles',
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },
                data: fd
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('uploadTeacehrFileToUrl ', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "uploadTeacehrFileToUrl ", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('uploadTeacehrFileToUrl ', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.getAllClass = function (successCallBack, failureCallBack) {
            // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetClasses',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "GetClasses", "Completed", 1000);
                successCallBack('GetClass', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "GetClasses", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('GetClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.monthList = function setMonths(successCallBack, failureCallBack) {
            $httpProvider({
                method: 'Get',
                url: './Fee/GetMonths',
                data: {

                }
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);

                successCallBack('monthList', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "monthList", "Completed", 1000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('monthList', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        return service;
    }
})();