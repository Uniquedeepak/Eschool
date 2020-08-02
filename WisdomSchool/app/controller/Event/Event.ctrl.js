(function () {
    'use strict';
    var controllerId = 'EventCtrl';
    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'EventService',
         'CommonSrvc',
         'uiCalendarConfig',
          EventCtlrFn
        ]);
    function EventCtlrFn($scope, EventService, CommonSrvc, uiCalendarConfig) {
        $scope.heading = "Event Detail";
        $scope.EventImg = "";
        $scope.subheading = "";
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        activate();
        ActivateCalender();
        function activate() {
            $scope.isLoading = true;
            EventService.getEventDetails(successCallBack, failureCallBack);
        }

        function ActivateCalender() {
            //Calender 
            $scope.SelectedEvent = null;
            $scope.events = [];
            $scope.eventSources = [$scope.events];
            var isFirstTime = true;

            //configure calendar
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    displayEventTime: false,
                    header: {
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    eventClick: function (event) {
                        $scope.SelectedEvent = event;
                    },
                    eventAfterAllRender: function () {
                        if ($scope.events.length > 0 && isFirstTime) {
                            //Focus first event
                            uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.events[0].start);
                            isFirstTime = false;
                        }
                    }
                }
            };
          
        }
       
        $scope.open = function (isDelete, item) {
            
            $scope.disableCtrl = isDelete === 3;
            $scope.crud = isDelete;
            $scope.selectedEvent = item;
            $("#EditEventModel").modal();
        }
        $scope.deletesEvent = function (EventDetail) {
            $scope.isLoading = true;
            EventService.deleteEvent(EventDetail.Id, successCallBack, failureCallBack);
        }
        $scope.addEvent = function (EventDetail) {
            $scope.isLoading = true;
            EventService.addEvent(EventDetail, successCallBack, failureCallBack);
        }
        $scope.updateEvent = function (EventDetail)
        {
            $scope.isLoading = true;
            EventService.updateEvent(EventDetail, successCallBack, failureCallBack);
        }
        $scope.showCalender = function () {
            $("#calenderPopup").modal();
        }
        
        function successCallBack(call, data) {
            switch (call) {
                case 'getEventDetails':
                    $scope.isLoading = false;
                    if (data && data.ResponseCode === "200") {
                        $scope.EventDetails = data.Result;
                        setCalenderEvent($scope.EventDetails);
                        $("#EditEventModel .close").click();
                        break;
                    }
                    break;
                case 'addEvent':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditEventModel .close").click();
                        break;
                    }
                    break;
                case 'updateEvent':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditEventModel .close").click();
                        break;
                    }
                    break;
                case 'deleteEvent':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        activate();
                        $("#EditEventModel .close").click();
                        break;
                    }
                    break;
               
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getEventDetails':
                    $scope.isLoading = false;
                    break;
                case 'updateEvent':
                    $scope.isLoading = false;
                    break;
                case 'deleteEvent':
                    $scope.isLoading = false;
                    break;
            }
        };

        function setCalenderEvent(Events) {
            console.log(Events);
            $scope.events.slice(0, $scope.events.length);
            angular.forEach(Events, function (item) {
                $scope.events.push({
                    title: item.Subject,
                    description: item.Description,
                    start: new Date(item.Start),
                    end: new Date(item.End),
                    allDay: item.IsFullDay,
                    stick: true,
                    color: item.ThemeColor
                });
            });

            $scope.eventSources = [$scope.events];
        };
    }
})();



