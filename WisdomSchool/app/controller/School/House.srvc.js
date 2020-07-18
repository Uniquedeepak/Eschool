(function () {
    'use strict';
    var ServiceId = 'HouseService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', HouseDetailserviceFunc]);
    function HouseDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {
        var service = {
            getHouseDetails: null,
            updateHouse: null,
            deleteHouse: null,
            addHouse: null
        };
        service.getHouseDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetHouse',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getHouseDetails', data);
                //toaster.pop('success', "GetHouseDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetHouseDetails", "Completed", 2000);
                    failureCallBack('getHouseDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addHouse = function (House, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/AddHouse',
                data: {
                    House: House
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addHouse", "Completed", 2000);
                successCallBack('addHouse', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addHouse", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addHouse', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateHouse = function (House, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateHouse',
                data: {
                    ID: House.HID,
                    House: House
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateHouse", "Completed", 2000);
                successCallBack('updateHouse', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateHouse", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateHouse', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteHouse = function (HID, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteHouse',
                data: {
                    ID: HID
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteHouse", "Completed", 2000);
                successCallBack('deleteHouse', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteHouse", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteHouse', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();