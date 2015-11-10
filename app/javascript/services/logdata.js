'use strict';
angular.module('myApp')
    .factory("LogProcess", function LogProcessFactory() {
        return {

            Count: function(arrayOfLogs, element) {
                var answer = [];
                var index = ['application', 'bytes-from-client', 'bytes-from-server', 'close-status', 'destination-address', 'destination-port', 'destination-zone-name', 'dst-nat-rule-name',
                    'elapsed-time', 'firewall-IP', 'hostname', 'icmp-type', 'log-type', 'nat-destination-address', 'nat-destination-port', 'nat-source-address', 'nat-source-port',
                    'nested-application', 'packet-incoming-interface', 'packets-from-client', 'packets-from-server', 'policy-name', 'protocol-id', 'reason', 'service-name', 'session-id-32',
                    'session-status', 'source-address', 'source-port', 'source-zone-name', 'src-nat-rule-name', 'transaction-time', 'time', 'username'
                ];

                function CountOx(dta, r) {
                    var count = {};
                    for (var i=0; i< dta.length; i++){
                        count[dta[i][index[r]]] = (count[dta[i][index[r]]] || 0) + 1;
                        console.log(count);
                    };
                    return Object.keys(count).map(function(k) {
                        var tmpObject = {};
                        tmpObject[index[r]] = k;
                        tmpObject.count = count[k];
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
            },




            Process: function(logObject, i) {
                var flat = {};
                var arrayOfLogs = logObject.data.split('\n');
                for (var i = 0; i < arrayOfLogs.length; i++) {
                    var arrayOfFields = [];
                    arrayOfFields = arrayOfLogs[i].split(/[ ]+/);
                    for (var x = 0; x < arrayOfFields.length; x++) {
                        var fieldSplit = arrayOfFields[x].split('=');
                        if (fieldSplit[1]) {
                            var obj = {};
                            obj[fieldSplit[0].trim()] = fieldSplit[1].trim();
                            arrayOfFields[x] = obj;
                        } else {
                            arrayOfFields[x] = fieldSplit[0];
                        }
                    }
                    arrayOfFields[0] = {
                        'month': arrayOfFields[0]
                    };
                    arrayOfFields[1] = {
                        'day': arrayOfFields[1]
                    };
                    arrayOfFields[2] = {
                        'time': arrayOfFields[2]
                    };
                    arrayOfFields[3] = {
                        'firewall-IP': arrayOfFields[3]
                    };
                    arrayOfFields[4] = {
                        'number': arrayOfFields[4]
                    };
                    arrayOfFields[5] = {
                        'transaction-time': arrayOfFields[5]
                    };
                    arrayOfFields[6] = {
                        'hostname': arrayOfFields[6]
                    };
                    arrayOfFields[7] = {
                        'log-type': arrayOfFields[7]
                    };
                    arrayOfFields[8] = {
                        'dash': arrayOfFields[8]
                    };
                    arrayOfFields[9] = {
                        'session-status': arrayOfFields[9]
                    };
                    arrayOfFields[10] = {
                        'junos': arrayOfFields[10]
                    };
                    if (arrayOfFields[9]['session-status'] === 'RT_FLOW_SESSION_CLOSE') {
                        arrayOfFields[12] = {
                            'close-status': arrayOfFields[12]
                        };
                    }
                    flat = {};
                    for (var t = 0; t < arrayOfFields.length; t++) {
                        for (var p in arrayOfFields[t]) {
                            flat[p] = arrayOfFields[t][p];
                        }
                    }
                    arrayOfLogs[i] = flat;
                }
                return arrayOfLogs;

            }
        }
    })
