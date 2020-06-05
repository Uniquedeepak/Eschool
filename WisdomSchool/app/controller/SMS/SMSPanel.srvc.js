(function () {
    'use strict';
    var ServiceId = 'SMSService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', SMSDetailserviceFunc]);

    function SMSDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {

        var service = {
            SendSMSByUser: null
        };

        service.SendSMSByUser = function (successCallBack, failureCallBack) {
           // $scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './SMS/SendSMSByUser',
                data: {
                    Text:'',
                    User:'',
                    ClassId:''
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', data, "Completed", 2000);
                successCallBack('SendSMSByUser', data);
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

        return service;
    }
})();