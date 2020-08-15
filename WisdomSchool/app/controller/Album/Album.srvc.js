(function () {
    'use strict';
    var ServiceId = 'AlbumService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', 'authService','$cookies', '$http', 'toaster', '$q', AlbumDetailserviceFunc]);
    function AlbumDetailserviceFunc($rootScope, authService, $cookies, $httpProvider, toaster, $q) {
        var ecareData = { token: $cookies.get("access_token"), baseUrl: $cookies.get("ESupportAPIUrl") }; 
        
        var service = {
            getAlbumDetails: null,
            updateAlbum: null,
            addAlbum: null,
            deleteAlbum: null,
        };
        service.getAlbumDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Post',
                url: ecareData.baseUrl + 'api/school/Albums',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {
                    SchoolCode :"GW"
                }
            }).success(function (data, status, headers, config) {
                successCallBack('getAlbumDetails', data);
                //toaster.pop('success', "GetAlbumDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetAlbumDetails", "Completed", 2000);
                    failureCallBack('getAlbumDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addAlbum = function (_Album, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'POST',
                url: ecareData.baseUrl + 'api/school/CreateAlbum',
                transformRequest: angular.identity,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": undefined
                },
                data: _Album
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addAlbum", "Completed", 2000);
                successCallBack('addAlbum', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addAlbum", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addAlbum', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateAlbum = function (_Album, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'PUT',
                url: ecareData.baseUrl + 'api/school/Album/Update/' + _Album.Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Album
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('updateAlbum', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "updateAlbum", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateAlbum', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.deleteAlbum = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Delete',
                url: ecareData.baseUrl + 'api/school/Album/Delete/' + Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {
                   
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteAlbum", "Completed", 2000);
                successCallBack('deleteAlbum', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteAlbum", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteAlbum', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        
        return service;
    }
})();