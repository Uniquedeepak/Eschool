(function () {
    'use strict';
    var controllerId = 'AlbumCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'AlbumService',
         'CommonSrvc',
          
          AlbumCtlrFn
        ]);
    function AlbumCtlrFn($scope, AlbumService,CommonSrvc) {
        $scope.heading = "Album";
        $scope.AlbumImg = "";
        $scope.subheading = "Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        //Image Gallery
        this.showCaption = true;
        this.current = 0;
        $scope.images = [];
        $scope.currentAlbum = "";
       
        //Image Gallery

        activate();


        function activate() {
            $scope.isLoading = true;
            AlbumService.getAlbumDetails(successCallBack, failureCallBack);
        }

        this.getIndex = function (img) {
            this.current = $scope.images.indexOf(img);
        }

        this.getPhotoIndex = function (albumId, img) {
            angular.forEach($scope.AlbumDetails, function (item) {
                if (item.ID == albumId) {
                    $scope.currentAlbum = item.ALBUM_NAME;
                    $scope.images = item.Photos;
                }
            });
            this.current = $scope.images.indexOf(img);
        }

        this.nextImage = function () {
            this.current += 1;
            if (this.current === $scope.images.length)
                this.current = 0;
        }

        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete === 3;
            $scope.crud = isDelete;

            $scope.selectedAlbum = item;
            $("#EditAlbumModel").modal();
        }
        $scope.deletesAlbum = function (AlbumDetail) {
            $scope.isLoading = true;
            AlbumService.deleteAlbum(AlbumDetail.Id, successCallBack, failureCallBack);
        }

        $scope.deleteAlbum = function (AlbumDetail) {
            $scope.isLoading = true;
            AlbumService.deleteAlbum(AlbumDetail.ID, successCallBack, failureCallBack);
        }

        $scope.addAlbum = function (AlbumDetail) {
            $scope.isLoading = true;

            var form = new FormData();
            for (var i in $scope.files) {
                form.append("Files", $scope.files[i]);
            }
            form.append("AlbumName", AlbumDetail.AlbumName);
            form.append("SchoolCode", "GW");
            
            AlbumService.addAlbum(form, successCallBack, failureCallBack);
        }
        $scope.updateAlbum = function (AlbumDetail)
        {
            $scope.isLoading = true;
            AlbumService.updateAlbum(AlbumDetail, successCallBack, failureCallBack);
        }

        $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };

        function successCallBack(call, data) {
            switch (call) {
                case 'getAlbumDetails':
                    $scope.isLoading = false;
                    if (data) {
                        $scope.AlbumDetails = data.Result;
                        $("#EditAlbumModel .close").click();
                        break;
                    }
                    break;
                case 'addAlbum':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditAlbumModel .close").click();
                        break;
                    }
                    break;
                case 'updateAlbum':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditAlbumModel .close").click();
                        break;
                    }
                    break;
                case 'deleteAlbum':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditAlbumModel .close").click();
                        break;
                    }
                    break;
                case 'downloadAlbum':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        break;
                    }
                    break;
                case 'GetClass':
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'monthList':
                    if (typeof data !== 'undefined' && data != null) {
                        var monthFeeHeads = [];
                        angular.forEach(data, function (value, key) {
                            monthFeeHeads.push(value.Month1);
                        });
                        $scope.monthFeeHeads = monthFeeHeads;
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getAlbumDetails':
                    $scope.isLoading = false;
                    break;
                case 'addAlbum':
                    $scope.isLoading = false;
                    break;
                case 'updateAlbum':
                    $scope.isLoading = false;
                    break;
                case 'deleteAlbum':
                    $scope.isLoading = false;
                    break;
                case 'downloadAlbum':
                    $scope.isLoading = false;
                    break;
                case 'GetClass':
                    $scope.isLoading = false;
                    break;
                case 'monthList':
                    $scope.isLoading = false;
                    break;
            }
        };
    }
})();



