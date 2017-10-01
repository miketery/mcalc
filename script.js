let finance = new Finance();

// default values
var data = {'principal': 300000, 'rate': 3.25, 'periods': 30};

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

  $('form#calc').submit(function() {
    console.log("Test submit");
  });




});
