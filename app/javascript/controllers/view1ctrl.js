'use strict';

angular.module('myApp')
    .controller('View1Ctrl', function($scope, LogProcess, Analyzer) {
        $scope.log;
        $scope.results={};

        $scope.submit = function(data) {
            $scope.logObject = {
                type: data.format,
                data: data.txt
            };
            $scope.submitted = true;
            $scope.logform = [];
            $scope.logObject.data = LogProcess.Process($scope.logObject);
            $scope.logObject.count = Analyzer.Count($scope.logObject);
            $scope.logObject.sorted = Analyzer.Sort($scope.logObject);
            console.log($scope.logObject.count);
        }
    });
