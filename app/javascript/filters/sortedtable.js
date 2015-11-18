'use strict';
angular.module('myApp')
  .filter('sortedTable', function() {

    return function(stuff,input) {
      if (input) {
        var rows = [];
        rows.push(input.keys.sorted);
        console.log(input.sorted[input.keys.sorted[0]].length);
        for (var i = 0; i<input.sorted[input.keys.sorted[0]].length; i++) {
        rows.push([input.sorted[input.keys.sorted[0]][i], input.sorted[input.keys.sorted[1]][i], input.sorted[input.keys.sorted[2]][i], input.sorted[input.keys.sorted[3]][i]]);
      }
      console.log(rows);
      return rows;
    }
    else {

    }
    }


  })
