(function () {
    'use strict';
    var ServiceId = 'SchoolService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', '$http', 'toaster', '$q', SchoolDetailserviceFunc]);
    function SchoolDetailserviceFunc($rootScope, $httpProvider,toaster, $q) {
        var service = {
            getSchoolDetails: null,
            updateSchool: null,
            deleteSchool: null
        };
        service.getSchoolDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: './Home/GetSchool',
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getSchoolDetails', data);
                //toaster.pop('success', "GetSchoolDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetSchoolDetails", "Completed", 2000);
                    failureCallBack('getSchoolDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.updateSchool = function (School, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/UpdateSchool',
                data: {
                    ID:School.ID,
                    school: School
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "UpdateSchool", "Completed", 2000);
                successCallBack('updateSchool', data);

              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "UpdateSchool", "Error", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateSchool', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.deleteSchool = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Post',
                url: './Home/DeleteSchool',
                data: {
                    id: Id
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteSchool", "Completed", 2000);
                successCallBack('deleteSchool', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteSchool", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteSchool', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        return service;
    }
})();