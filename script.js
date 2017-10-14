let finance = new Finance();

// default values
var data = {'principal': 300000, 'rate': 3.25, 'periods': 30};

var grid = {};

function calculate() {
  return finance.AM(data['principal'], data['rate'], data['periods'], 0);
}

$(document).ready(function() {
  $('#annuity').text('$ '+calculate());
  //$('#annuity').innerHTML = '$ '+calculate();
  $('input[name="principal"]').val(data['principal']);
  $('input[name="rate"]').val(data['rate']);
  $('input[name="periods"]').val(data['periods']);

  $('#calc input').change(function() {
    data[$(this).attr('name')] = parseFloat($(this).val());
    $('#annuity').text('$ '+calculate());
  });

  $('form#calc').submit(function(e) {
    e.preventDefault();
    console.log("Test submit");
  });

});

function get_dollar_range(d) {
  let partial = d * 0.05;
  let range = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
  let j = 0;
  for(var i=0; i<range.length && range[i]<=partial; i++) {
    j = i;  
  }
  return range[j]
}

