(function () {
    'use strict';
    var controllerId = 'TransportCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'TransportService',
          
          TransportCtlr
        ]);

    function TransportCtlr($scope, TransportService) {
        
        $scope.heading = "Transport Detail";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.selectedTransport = {};

        activate();
        function activate() {
            $scope.isLoading = true;
            TransportService.getTransportDetails(successCallBack, failureCallBack);
        }
        

        $scope.open = function (flag, item) {
            
            if (flag == 1)
            {
                $scope.selectedTransport = {};
                $scope.disableCtrl = false;
                $scope.selectedTransport.TId = "";
                $scope.selectedTransport.TransportType = "";
                $scope.selectedTransport.Route = "";
                $scope.selectedTransport.Charge = "";
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
            
            $scope.selectedTransport = item;
            $("#EditTransportModel").modal();
        }

        $scope.addTransport = function (TransportDetail) {
            $scope.isLoading = true;
            TransportService.addTransport(TransportDetail, successCallBack, failureCallBack);
        }

        $scope.deletesTransport = function (TransportDetail) {
            $scope.isLoading = true;
            TransportService.deleteTransport(TransportDetail.TId, successCallBack, failureCallBack);
        }

        $scope.updateTransport = function (TransportDetail)
        {
            $scope.isLoading = true;
            TransportService.updateTransport(TransportDetail, successCallBack, failureCallBack);
        }

        function successCallBack(call, data) {
            switch (call) {
                case 'getTransportDetails':
                    
                    $scope.isLoading = false;
                    if (data) {
                        $scope.TransportDetails = data;
                        $("#EditTransportModel .close").click();
                        break;
                    }
                    break;
                case 'addTransport':
                    $scope.isLoading = false;
                    
                    if (data) {
                        $("#EditTransportModel .close").click();
                        TransportService.getTransportDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'updateTransport':
                    $scope.isLoading = false;
                    
                    if (data) {
                        $("#EditTransportModel .close").click();
                        TransportService.getTransportDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
                case 'deleteTransport':
                    $scope.isLoading = false;
                    
                    if (data) {
                        $("#EditTransportModel .close").click();
                        TransportService.getTransportDetails(successCallBack, failureCallBack);
                        break;
                    }
                    break;
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getTransportDetails':
                    $scope.isLoading = false;
                    
                    break;
                case 'addTransport':
                    $scope.isLoading = false;
                    
                    break;
                case 'updateTransport':
                    $scope.isLoading = false;
                    
                    break;
                case 'deleteTransport':
                    $scope.isLoading = false;
                    
                    break;
            }
        };
    }
})();



