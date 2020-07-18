(function () {
    'use strict';
    var ServiceId = 'TransportService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', TransportDetailserviceFunc]);

    function TransportDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {

        var service = {
            getTransportDetails: null,
            addTransport: null,
            updateTransport: null,
            deleteTransport: null
        };

        service.getTransportDetails = function (successCallBack, failureCallBack) {
           // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetTransportCharge',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getTransportDetails', data);
                //toaster.pop('success', "GetTransportDetails", "Completed", 2000);
                //$scope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetTransportDetails", "Completed", 2000);
                    failureCallBack('getTransportDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
               // $scope.loading = false;
            });
        };

        service.addTransport = function (Transport, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/AddTransport',
                data: {
                    Transport: Transport
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "Add Transport", "Completed", 2000);
                successCallBack('addTransport', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Add Transport", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addTransport', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        service.updateTransport = function (Transport, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateTransport',
                data: {
                    Tid: Transport.TId,
                    Transport: Transport
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateTransport", "Completed", 2000);
                successCallBack('updateTransport', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateTransport", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateTransport', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        service.deleteTransport = function (Tid, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteTransport',
                data: {
                    Tid: Tid
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteTransport", "Completed", 2000);
                successCallBack('deleteTransport', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteTransport", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteTransport', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        return service;
    }
})();