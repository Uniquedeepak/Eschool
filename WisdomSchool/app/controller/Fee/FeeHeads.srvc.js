(function () {
    'use strict';
    var ServiceId = 'FeeHeadsService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', FeeHeadsDetailserviceFunc]);
    function FeeHeadsDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {
        var service = {
            getFeeHeadsDetails: null,
            updateFeeHeads: null,
            deleteFeeHeads: null,
            addFeeHeads: null
        };
        service.getFeeHeadsDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Fee/GetFeeHeads',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getFeeHeadsDetails', data);
                //toaster.pop('success', "GetFeeHeadsDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if(typeof data !== 'undefined' && data != null){
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetFeeHeadsDetails", "Completed", 2000);
                    failureCallBack('getFeeHeadsDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addFeeHeads = function (FeeHeads, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/AddFeeHead',
                data: {
                    FeeHeading: FeeHeads
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addFeeHeads", "Completed", 2000);
                successCallBack('addFeeHeads', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addFeeHeads", "Completed", 2000);
                if(typeof data !== 'undefined' && data != null){
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addFeeHeads', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateFeeHeads = function (FeeHeads, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/UpdateFeeHead',
                data: {
                    ID: FeeHeads.CID,
                    FeeHeading: FeeHeads
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateFeeHeads", "Completed", 2000);
                successCallBack('updateFeeHeads', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateFeeHeads", "Completed", 2000);
                if(typeof data !== 'undefined' && data != null){
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateFeeHeads', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteFeeHeads = function (CID, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Fee/DeleteFeeHeads',
                data: {
                    ID: CID
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteFeeHeads", "Completed", 2000);
                successCallBack('deleteFeeHeads', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteFeeHeads", "Completed", 2000);
                if(typeof data !== 'undefined' && data != null){
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteFeeHeads', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();