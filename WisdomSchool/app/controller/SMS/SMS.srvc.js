(function () {
    'use strict';
    var ServiceId = 'SMSService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', SMSDetailserviceFunc]);

    function SMSDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {

        var service = {
            getSMSDetails: null,
            addSMS: null,
            updateSMS: null,
            deleteSMS: null
        };

        service.getSMSDetails = function (successCallBack, failureCallBack) {
           // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetSMSCharge',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getSMSDetails', data);
                //toaster.pop('success', "GetSMSDetails", "Completed", 2000);
                //$scope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetSMSDetails", "Completed", 2000);
                    failureCallBack('getSMSDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
               // $scope.loading = false;
            });
        };

        service.addSMS = function (SMS, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/AddSMS',
                data: {
                    SMS: SMS
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "Add SMS", "Completed", 2000);
                successCallBack('addSMS', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Add SMS", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addSMS', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        service.updateSMS = function (SMS, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateSMS',
                data: {
                    Tid: SMS.TId,
                    SMS: SMS
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateSMS", "Completed", 2000);
                successCallBack('updateSMS', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateSMS", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateSMS', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        service.deleteSMS = function (Tid, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteSMS',
                data: {
                    Tid: Tid
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteSMS", "Completed", 2000);
                successCallBack('deleteSMS', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteSMS", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteSMS', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        return service;
    }
})();