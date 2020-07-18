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
app.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    var serviceBase = 'http://localhost:59822/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };
    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(
            serviceBase + 'oauth/token',
            data,
            {
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "cache-control": "no-cache",
                }
            }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, baseUrl: serviceBase, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };
    var _logOut = function () {
        localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.userName = "";
    };
    var _fillAuthData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);
app.factory('SchoolData',['CommonSrvc',function (CommonSrvc) {
            var factory = {};
            CommonSrvc.getSchool(successCallBack, failureCallBack);
            CommonSrvc.CurrentSession(successCallBack, failureCallBack);
            function successCallBack(call, data) {
                switch (call) {
                    case 'CurrentSession':
                        if (typeof data !== 'undefined' && data != null) {
                            return factory.session = data;
                        }
                    case 'getSchool':
                        if (typeof data !== 'undefined' && data != null) {
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
        }]);
