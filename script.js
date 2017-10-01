let finance = new Finance();

// default values
var data = {'principal': 300000, 'rate': 3.25, 'periods': 30};

function calculate() {
  return finance.AM(data['principal'], data['rate'], data['periods'], 0);
}

$(document).ready(function() {
  $('.annuity').text(calculate());

  $('form#calc input').change(function() {
    data[$(this).attr('name')] = parseFloat($(this).val());
    $('.annuity').text(calculate());
  });




});
