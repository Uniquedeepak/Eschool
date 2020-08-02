(function () {
    'use strict';
    var ServiceId = 'EventService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', 'authService','$cookies', '$http', 'toaster', '$q', EventDetailserviceFunc]);
    function EventDetailserviceFunc($rootScope, authService, $cookies, $httpProvider, toaster, $q) {
        var ecareData = { token: $cookies.get("access_token"), baseUrl: $cookies.get("ESupportAPIUrl") }; 
        
        var service = {
            getEventDetails: null,
            updateEvent: null,
            addEvent: null,
            deleteEvent: null,
        };
        service.getEventDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: ecareData.baseUrl + 'api/school/Event',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getEventDetails', data);
                //toaster.pop('success', "GetEventDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetEventDetails", "Completed", 2000);
                    failureCallBack('getEventDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addEvent = function (_Event, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'POST',
                url: ecareData.baseUrl +'api/school/Event/Insert',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Event
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addEvent", "Completed", 2000);
                successCallBack('addEvent', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addEvent", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addEvent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateEvent = function (_Event, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'PUT',
                url: ecareData.baseUrl + 'api/school/Event/Update/' + _Event.Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Event
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('updateEvent', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "updateEvent", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateEvent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.deleteEvent = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Delete',
                url: ecareData.baseUrl + 'api/school/Event/Delete/' + Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {
                   
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteEvent", "Completed", 2000);
                successCallBack('deleteEvent', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteEvent", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteEvent', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        
        return service;
    }
})();