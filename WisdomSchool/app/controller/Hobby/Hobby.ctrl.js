(function () {
    'use strict';
    var controllerId = 'HobbyCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'HobbyService',
          
          HobbyCtlr
        ]);

    function HobbyCtlr($scope, HobbyService) {
        
        $scope.heading = "Hobby Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.selectedHobby = {};

        activate();
        function activate() {
            $scope.isLoading = true;
            HobbyService.getHobbyDetails(successCallBack, failureCallBack);
        }
        

        $scope.open = function (flag, item) {
            
            if (flag == 1)
            {
                $scope.selectedHobby = {};
                $scope.disableCtrl = false;
                $scope.selectedHobby.Id = "";
                $scope.selectedHobby.HobbyType = "";
                $scope.selectedHobby.Route = "";
                $scope.selectedHobby.Charge = "";
                $scope.showAdd = true;
                $scope.showEdit = false;
                $scope.showDelete = false;
            }
            else if(flag == 2)
            {
                $scope.disableCtrl = false;
                $scope.showAdd = false;
                $scope.showEdit = true;
                $scope.showDelete = false;
            }
            else if (flag == 3)
            {
                $scope.disableCtrl = true;
                $scope.showAdd = false;
                $scope.showEdit = false;
                $scope.showDelete = true;
            }
            
            $scope.selectedHobby = item;
            $("#EditHobbyModel").modal();
        }

        $scope.addHobby = function (HobbyDetail) {
            $scope.isLoading = true;
            HobbyService.addHobby(HobbyDetail, successCallBack, failureCallBack);
        }

        $scope.deletesHobby = function (HobbyDetail) {
            $scope.isLoading = true;
            HobbyService.deleteHobby(HobbyDetail.Id, successCallBack, failureCallBack);
        }

        $scope.updateHobby = function (HobbyDetail)
        {
            $scope.isLoading = true;
            HobbyService.updateHobby(HobbyDetail, successCallBack, failureCallBack);
        }

        function successCallBack(call, data) {
            switch (call) {
                case 'getHobbyDetails':
                    
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.HobbyDetails = data;
                        $("#EditHobbyModel .close").click();
                        break;
                    }
                    break;
                case 'addHobby':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $("#EditHobbyModel .close").click();
                        HobbyService.getHobbyDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'updateHobby':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $("#EditHobbyModel .close").click();
                        HobbyService.getHobbyDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'deleteHobby':
                    $scope.isLoading = false;
                    
                    if (typeof data !== 'undefined' && data != null) {
                        $("#EditHobbyModel .close").click();
                        HobbyService.getHobbyDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getHobbyDetails':
                    $scope.isLoading = false;
                    
                    break;
                case 'addHobby':
                    $scope.isLoading = false;
                    
                    break;
                case 'updateHobby':
                    $scope.isLoading = false;
                    
                    break;
                case 'deleteHobby':
                    $scope.isLoading = false;
                    
                    break;
            }
        };
    }
})();



