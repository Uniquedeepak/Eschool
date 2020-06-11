var app = angular.module('MyFactory', []);

app.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
})


app.factory('SchoolData',
    ['CommonSrvc', 
        function (CommonSrvc) {
            var factory = {}; 
            CommonSrvc.getSchool(successCallBack, failureCallBack);
            CommonSrvc.CurrentSession(successCallBack, failureCallBack);
            function successCallBack(call, data) {
                switch (call) {
                    case 'CurrentSession':
                        if (data) {
                            return factory.session = data;
                        }
                    case 'getSchool':
                        if (data) {
                            return factory.school = data[0];
                        }
                }
            };
            function failureCallBack(call, data) {
                switch (call) {
                    case 'CurrentSession':
                        alert("Error Occured during CurrentSession. " + data);
                        break;
                    case 'getSchoolDetails':
                        break;
                }
            };
            return factory;
        }
    ]);
	//.controller('MyCtrl', function (Excel, $timeout) {
	//    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
	//        $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
	//        $timeout(function () { location.href = $scope.fileData.exportHref; }, 100); // trigger download
	//    }
	//});