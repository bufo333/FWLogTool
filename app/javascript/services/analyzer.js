'use strict';
angular.module('myApp')
    .factory("Analyzer", function LogAnalyzerFactory() {
      var properties = ['application', 'bytes-from-client', 'bytes-from-server', 'close-status', 'destination-address', 'destination-port', 'destination-zone-name', 'dst-nat-rule-name',
          'elapsed-time', 'firewall-IP', 'hostname', 'icmp-type', 'log-type', 'nat-destination-address', 'nat-destination-port', 'nat-source-address', 'nat-source-port',
          'nested-application', 'packet-incoming-interface', 'packets-from-client', 'packets-from-server', 'policy-name', 'protocol-id', 'reason', 'service-name', 'session-id-32',
          'session-status', 'source-address', 'source-port', 'source-zone-name', 'src-nat-rule-name', 'transaction-time', 'time', 'username'
      ];
        return {

            Count: function(arrayOfLogs) {
                var answer = [];
                var index = [4,5,6,18,19,20,21,22,24,26,27];
                function CountOx(dta, r) {
                    var count = {};
                    for (var i=0; i< dta.length; i++){
                        if (Array.isArray(count[dta[i][index[r]]])) {
                            count[dta[i][index[r]]][0] = (count[dta[i][index[r]]][0] || 0) + 1;
                            count[dta[i][index[r]]][1].push(i);
                          }
                        else {
                            count[dta[i][index[r]]] = [];
                            count[dta[i][index[r]]][0] = 1;
                            count[dta[i][index[r]]][1] =[];
                            count[dta[i][index[r]]][1].push(i);
                         }
                        console.log(count);
                    };
                    return Object.keys(count).map(function(k) {
                        var tmpObject = {};
                        tmpObject[index[r][0]] = k;
                        tmpObject.count = count[k];
                        //tmpObject.
                        console.log(tmpObject);
                        return tmpObject;

                    });
                }

                answer.push(CountOx(arrayOfLogs.data, element));

                function Comparator(a, b) {
                    return parseInt(b.count, 10) - parseInt(a.count, 10);
                }

                answer.forEach(function(item) {
                    return item.sort(Comparator);
                });
                return (answer);
            }
          }
})
