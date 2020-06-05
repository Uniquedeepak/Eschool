angular.module('AngularApp').filter('myDate', function ($filter) {
    var angularDateFilter = $filter('date');
    return function (theDate) {
        return angularDateFilter(theDate, 'dd MMMM @ HH:mm:ss');
    }
});