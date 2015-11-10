'use strict';

angular.module('myApp')
    .controller('View1Ctrl', function($scope, LogProcess) {
        $scope.log;
        $scope.results=[];

        $scope.submit = function(data) {
            $scope.logObject = ({
                type: data.format,
                data: data.txt
            });
            $scope.submitted = true;
            $scope.logform = [];
            var answer = {
                type: data.format,
                data: LogProcess.Process($scope.logObject)
            };
            $scope.logObject = {};
            $scope.results = LogProcess.Count(answer,4);
        }
    });
