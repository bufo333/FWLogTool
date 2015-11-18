'use strict';

angular.module('myApp')
    .controller('View1Ctrl', function($scope, LogProcess, Analyzer) {
        $scope.log;
        $scope.results={};

        $scope.submit = function(data) {
            $scope.logObject = {
                type: data.format,
                data: data.txt,
                keys: {sorted:[],count:[]}
            };
            $scope.submitted = true;
            $scope.logform = [];
            $scope.logObject.data = LogProcess.Process($scope.logObject);
            $scope.logObject.count = Analyzer.Count($scope.logObject);
            $scope.logObject.sorted = Analyzer.Sort($scope.logObject);
            for (var key in Object.keys($scope.logObject.sorted)) {
                $scope.logObject.keys.sorted.push(Object.keys($scope.logObject.sorted)[key]);
              }


            console.log($scope.logObject);
        }
        $scope.showRule = function(rule) {
          $scope.clicked = $scope.logObject.data[rule.substring[5,-1]];

        }
    });
