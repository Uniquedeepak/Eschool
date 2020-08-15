(function () {
    'use strict';
    var ServiceId = 'FeedbackService';
    angular.module('AngularApp').service(ServiceId, ['$rootScope', 'authService','$cookies', '$http', 'toaster', '$q', FeedbackDetailserviceFunc]);
    function FeedbackDetailserviceFunc($rootScope, authService, $cookies, $httpProvider, toaster, $q) {
        var ecareData = { token: $cookies.get("access_token"), baseUrl: $cookies.get("ESupportAPIUrl") }; 
        
        var service = {
            getFeedbackDetails: null,
            updateFeedback: null,
            addFeedback: null,
            deleteFeedback: null,
        };
        service.getFeedbackDetails = function (successCallBack, failureCallBack) {
            $rootScope.loading = true;
            $httpProvider({
                method: 'Get',
                url: ecareData.baseUrl + 'api/school/Feedback',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {

                }
            }).success(function (data, status, headers, config) {
                successCallBack('getFeedbackDetails', data);
                //toaster.pop('success', "GetFeedbackDetails", "Completed", 2000);
                $rootScope.loading = false;
            }).error(function (data, status, headers, config) {
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    toaster.pop('error', "GetFeedbackDetails", "Completed", 2000);
                    failureCallBack('getFeedbackDetails', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                $rootScope.loading = false;
            });
        };
        service.addFeedback = function (_Feedback, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'POST',
                url: ecareData.baseUrl +'api/school/Feedback/Insert',
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Feedback
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "addFeedback", "Completed", 2000);
                successCallBack('addFeedback', data);

                //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "addFeedback", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('addFeedback', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        service.updateFeedback = function (_Feedback, successCallBack, failureCallBack) {
            $httpProvider({
                method: 'PUT',
                url: ecareData.baseUrl + 'api/school/Feedback/Update/' + _Feedback.Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                data: _Feedback
            }).success(function (data, status, headers, config) {
                //toaster.pop('success', "getTransportCharge", "Completed", 1000);
                successCallBack('updateFeedback', data);
                //   $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "updateFeedback", "Completed", 1000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('updateFeedback', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                // $scope.loading = false;
            });
        };
        service.deleteFeedback = function (Id, successCallBack, failureCallBack) {
            //$scope.loading = true;
            $httpProvider({
                method: 'Delete',
                url: ecareData.baseUrl + 'api/school/Feedback/Delete/' + Id,
                headers: {
                    "Authorization": "Bearer " + ecareData.token,
                },
                data: {
                   
                }
            }).success(function (data, status, headers, config) {
                toaster.pop('success', "DeleteFeedback", "Completed", 2000);
                successCallBack('deleteFeedback', data);
              //  $scope.loading = false;
            }).error(function (data, status, headers, config) {
                toaster.pop('error', "DeleteFeedback", "Completed", 2000);
                if (typeof data !== 'undefined' && data != null) {
                    if (typeof data !== "string") {
                        data = JSON.stringify(data);
                    }
                    failureCallBack('deleteFeedback', data);
                    return;
                }
                failureCallBack("An internal processing error occurred.");
                //$scope.loading = false;
            });
        };
        
        return service;
    }
})();