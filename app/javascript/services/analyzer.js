'use strict';
angular.module('myApp')
    .factory("Analyzer", function LogAnalyzerFactory() {
      var properties = ['application', 'bytes-from-client', 'bytes-from-server', 'close-status', 'destination-address', 'destination-port', 'destination-zone-name', 'dst-nat-rule-name',
          'elapsed-time', 'firewall-IP', 'hostname', 'icmp-type', 'log-type', 'nat-destination-address', 'nat-destination-port', 'nat-source-address', 'nat-source-port',
          'nested-application', 'packet-incoming-interface', 'packets-from-client', 'packets-from-server', 'policy-name', 'protocol-id', 'reason', 'service-name', 'session-id-32',
          'session-status', 'source-address', 'source-port', 'source-zone-name', 'src-nat-rule-name', 'transaction-time', 'time', 'username'];

        return {

            Count: function(arrayOfLogs) {
                console.log(arrayOfLogs);
                var answer = [];
                var index = [4,5,6,7,13,14,15,16,18,21,22,24,26,27];
                function CountOx(dta, r) {
                    var count = {};
                    for (var i=0; i< dta.length; i++){
                        if (Array.isArray(count[dta[i][properties[r]]])) {
                            count[dta[i][properties[r]]][0] = (count[dta[i][properties[r]]][0] || 0) + 1;
                            count[dta[i][properties[r]]][1].push(i);
                          }
                        else {
                            count[dta[i][properties[r]]] = [];
                            count[dta[i][properties[r]]][0] = 1;
                            count[dta[i][properties[r]]][1] =[];
                            count[dta[i][properties[r]]][1].push(i);
                         }

                    };
                    return Object.keys(count).map(function(k) {
                        var tmpObject = {};
                        tmpObject[properties[r]] = k;
                        tmpObject.count = count[k][0];
                        tmpObject.rules = count[k][1];
                        return tmpObject;

                    });
                }
                index.forEach(function(element){
                answer.push(CountOx(arrayOfLogs.data, element));

              });

                function Comparator(a, b) {
                    return parseInt(b.count, 10) - parseInt(a.count, 10);
                }

                answer.forEach(function(item) {
                    return item.sort(Comparator);
                });
                return (answer);
            },

            Sort: function(arrayOfLogs) {
                var index = [1,2,19,20];
                var answer={};

                function SortOx(dta, r){
                  var count = {};
                  count[properties[r]]=[];

                  for (var i=0; i< dta.length; i++){
                    if(dta[i][properties[r]])
                    count[properties[r]].push(["rule " + i,dta[i][properties[r]]]);
                  }
                  return count[properties[r]].sort(Comparator);
                }

                function Comparator(a, b) {

                    return parseInt(b[1].substring(1,(b[1].length-1)), 10) - parseInt(a[1].substring(1,(a[1].length-1)), 10);
                }

                index.forEach(function(element){
                answer[properties[element]]=(SortOx(arrayOfLogs.data, element));

                  })

                return (answer);

          }
        }
      })
