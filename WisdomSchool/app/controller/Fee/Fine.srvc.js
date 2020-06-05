(function () {
    'use strict';
    var ServiceId = 'FinesService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', FinesDetailserviceFunc]);
    function FinesDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {
        var service = {
            getFinesDetails: null,
            updateFines: null,
            deleteFines: null,
            addFines: null
        };
        service.getFinesDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Fee/GetFines',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getFinesDetails', data);
                //toaster.pop('success', "GetFinesDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetFinesDetails", "Completed", 2000);
                    failureCallBack('getFinesDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addFines = function (Fines, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/AddFine',
                data: {
                    fine: Fines
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addFines", "Completed", 2000);
                successCallBack('addFines', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addFines", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addFines', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateFines = function (Fines, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/UpdateFine',
                data: {
                    ID: Fines.Id,
                    fine: Fines
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateFines", "Completed", 2000);
                successCallBack('updateFines', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateFines", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateFines', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteFines = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/DeleteFine',
                data: {
                    ID: Id
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteFines", "Completed", 2000);
                successCallBack('deleteFines', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteFines", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteFines', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();