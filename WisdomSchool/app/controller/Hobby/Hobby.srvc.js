(function () {
    'use strict';
    var ServiceId = 'HobbyService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', HobbyDetailserviceFunc]);

    function HobbyDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {

        var service = {
            getHobbyDetails: null,
            addHobby: null,
            updateHobby: null,
            deleteHobby: null
        };

        service.getHobbyDetails = function (successCallBack, failureCallBack) {
           // $scope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetHobby',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getHobbyDetails', data);
                //toaster.pop('success', "GetHobbyDetails", "Completed", 2000);
                //$scope.loading = false;
            }).error(function (data, status, headers, config) {
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetHobbyDetails", "Completed", 2000);
                    failureCallBack('getHobbyDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
               // $scope.loading = false;
            });
        };

        service.addHobby = function (Hobby, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/AddHobby',
                data: {
                    Hobby: Hobby
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "Add Hobby", "Completed", 2000);
                successCallBack('addHobby', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "Add Hobby", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addHobby', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        service.updateHobby = function (Hobby, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateHobby',
                data: {
                    Tid: Hobby.Id,
                    Hobby: Hobby
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateHobby", "Completed", 2000);
                successCallBack('updateHobby', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateHobby", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateHobby', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        service.deleteHobby = function (Tid, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteHobby',
                data: {
                    Tid: Tid
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteHobby", "Completed", 2000);
                successCallBack('deleteHobby', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteHobby", "Completed", 2000);
                if (data) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteHobby', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };

        return service;
    }
})();