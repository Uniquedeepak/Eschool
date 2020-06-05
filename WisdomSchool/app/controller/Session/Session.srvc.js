(function () {
    'use strict';
    var ServiceId = 'SessionService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', SessionDetailserviceFunc]);
    function SessionDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {
        var service = {
            getSessionDetails: null,
            updateSession: null,
            deleteSession: null
        };
        service.getSessionDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetSession',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getSessionDetails', data);
                //toaster.pop('success', "GetSessionDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetSessionDetails", "Completed", 2000);
                    failureCallBack('getSessionDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.updateSession = function (Session, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateSession',
                data: {
                    Id: Session.Id,
                    _Session: Session
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateSession", "Completed", 2000);
                successCallBack('updateSession', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateSession", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateSession', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteSession = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteSession',
                data: {
                    Id: Id
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteSession", "Completed", 2000);
                successCallBack('deleteSession', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteSession", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteSession', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();