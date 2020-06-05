(function () {
    'use strict';
    var ServiceId = 'ClassService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', ClassDetailserviceFunc]);
    function ClassDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {
        var service = {
            getClassDetails: null,
            updateClass: null,
            deleteClass: null
        };
        service.getClassDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetClasses',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getClassDetails', data);
                //toaster.pop('success', "GetClassDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetClassDetails", "Completed", 2000);
                    failureCallBack('getClassDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.updateClass = function (Class, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateClass',
                data: {
                    CID: Class.CID,
                    _Class: Class
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateClass", "Completed", 2000);
                successCallBack('updateClass', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateClass", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteClass = function (CID, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteClass',
                data: {
                    CID: CID
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteClass", "Completed", 2000);
                successCallBack('deleteClass', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteClass", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteClass', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();