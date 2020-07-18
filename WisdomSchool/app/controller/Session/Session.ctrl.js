(function () {
    'use strict';
    var controllerId = 'SessionCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'SessionService',
          
          SessionCtlr
        ]);
    function SessionCtlr($scope, SessionService) {
        $scope.heading = "Session Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        activate();
        function activate() {
            $scope.isLoading = true;
            SessionService.getSessionDetails(successCallBack, failureCallBack);
        }
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete;
            $scope.selectedSession = item;
            $("#EditSessionModel").modal();
        }
        $scope.deletesSession = function (SessionDetail) {
            $scope.isLoading = true;
            SessionService.deleteSession(SessionDetail.Id, successCallBack, failureCallBack);
        }
        $scope.updateSession = function (SessionDetail)
        {
            $scope.isLoading = true;
            //Todo:
            //$scope.msgTitle = 'Alert';
            //$scope.msgBody = 'The Tomatoes Exploded!';
            //$scope.msgType = 'warning';

            //$scope.flash = flash;
            //flash.pop({ title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType });

            SessionService.updateSession(SessionDetail, successCallBack, failureCallBack);
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getSessionDetails':
                    
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.SessionDetails = data;
                        $("#EditSessionModel .close").click();
                        break;
                    }
                    break;
                case 'updateSession':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditSessionModel .close").click();
                        break;
                    }
                    break;
                case 'deleteSession':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getSessionDetails':
                    $scope.isLoading = false;
                    
                    break;
                case 'updateSession':
                    $scope.isLoading = false;
                    
                    break;
                case 'deleteSession':
                    $scope.isLoading = false;
                    
                    break;
            }
        };
    }
})();



