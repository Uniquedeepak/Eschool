(function () {
    'use strict';
    var controllerId = 'FeedbackCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'FeedbackService',
         'CommonSrvc',
         'uiCalendarConfig',
          FeedbackCtlrFn
        ]);
    function FeedbackCtlrFn($scope, FeedbackService, CommonSrvc, uiCalendarConfig) {
        $scope.heading = "Student's";
        $scope.FeedbackImg = "";
        $scope.subheading = "Feedback";
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        activate();
        ActivateCalender();
        function activate() {
            $scope.isLoading = true;
            FeedbackService.getFeedbackDetails(successCallBack, failureCallBack);
        }

        function ActivateCalender() {
            //Calender 
            $scope.SelectedFeedback = null;
            $scope.Feedbacks = [];
            $scope.FeedbackSources = [$scope.Feedbacks];
            var isFirstTime = true;

            //configure calendar
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    displayFeedbackTime: false,
                    header: {
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    FeedbackClick: function (Feedback) {
                        $scope.SelectedFeedback = Feedback;
                    },
                    FeedbackAfterAllRender: function () {
                        if ($scope.Feedbacks.length > 0 && isFirstTime) {
                            //Focus first Feedback
                            uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.Feedbacks[0].start);
                            isFirstTime = false;
                        }
                    }
                }
            };
          
        }
       
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete === 3;
            $scope.crud = isDelete;
            $scope.selectedFeedback = item;
            $("#EditFeedbackModel").modal();
        }
        $scope.deletesFeedback = function (FeedbackDetail) {
            $scope.isLoading = true;
            FeedbackService.deleteFeedback(FeedbackDetail.ID, successCallBack, failureCallBack);
        }
        $scope.addFeedback = function (FeedbackDetail) {
            $scope.isLoading = true;
            FeedbackService.addFeedback(FeedbackDetail, successCallBack, failureCallBack);
        }
        $scope.updateFeedback = function (FeedbackDetail)
        {
            $scope.isLoading = true;
            FeedbackService.updateFeedback(FeedbackDetail, successCallBack, failureCallBack);
        }
        $scope.showCalender = function () {
            $("#calenderPopup").modal();
        }
        
        function successCallBack(call, data) {
            switch (call) {
                case 'getFeedbackDetails':
                    $scope.isLoading = false;
                    if (data && data.ResponseCode === "200") {
                        $scope.FeedbackDetails = data.Result;
                        setCalenderFeedback($scope.FeedbackDetails);
                        $("#EditFeedbackModel .close").click();
                        break;
                    }
                    break;
                case 'addFeedback':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditFeedbackModel .close").click();
                        break;
                    }
                    break;
                case 'updateFeedback':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditFeedbackModel .close").click();
                        break;
                    }
                    break;
                case 'deleteFeedback':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditFeedbackModel .close").click();
                        break;
                    }
                    break;
               
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getFeedbackDetails':
                    $scope.isLoading = false;
                    break;
                case 'updateFeedback':
                    $scope.isLoading = false;
                    break;
                case 'deleteFeedback':
                    $scope.isLoading = false;
                    break;
            }
        };

        function setCalenderFeedback(Feedbacks) {
            console.log(Feedbacks);
            $scope.Feedbacks.slice(0, $scope.Feedbacks.length);
            angular.forEach(Feedbacks, function (item) {
                $scope.Feedbacks.push({
                    title: item.Subject,
                    description: item.Description,
                    start: new Date(item.Start),
                    end: new Date(item.End),
                    allDay: item.IsFullDay,
                    stick: true,
                    color: item.ThemeColor
                });
            });

            $scope.FeedbackSources = [$scope.Feedbacks];
        };
    }
})();



