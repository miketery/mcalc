let finance = new Finance();

// default values
let data = {'principal': 300000, 'rate': 3.25, 'periods': 30};

let dollar_step_sizes = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
let rate_step_sizes = [0.1, .15, .2, .25, .4, .5, 1];
let dollar_steps = 9; let rate_steps = 5;
let dollar_partial = 0.1; let rate_partial = 0.1;

let grid = {};

function calculate() {
  return finance.AM(data.principal, data.rate, data.periods, 0);
}
function calculate_table(table_id) {
  let rows = get_range(data.principal, dollar_partial, dollar_step_sizes, dollar_steps);
  let cols = get_range(data.rate, rate_partial, rate_step_sizes, rate_steps);
  let out = [];
  for(let i = 0; i < rows.length; i++) {
    out[i] = [];
    for(let j = 0; j < cols.length; j++)
      out[i][j] = Math.round(finance.AM(rows[i], cols[j], data.periods, 0),2);
  }
  let table = [[''].concat(cols)];
  for(let i = 0; i < rows.length; i++) {
    table.push(["$ "+rows[i]].concat(out[i]));
  }
  console.log(table);
  let trs = [];
  for(let i = 0; i < table.length; i++)
    trs[i] = "<td>"+(table[i]).join("</td><td>")+"</td>";
  $(table_id).html("<table><tr>"+trs.join("</tr><tr>")+"</tr></table>");
  console.log($(table_id + ' tr')[0]); //[Math.round(dollar_steps/2)].addClass('highlight');
  console.log($(table_id + ' tr')[Math.round(dollar_steps/2)]);
  $(table_id + ' table tr:nth-child('+Math.round(dollar_steps/2+1)+')').addClass('bg-lightest-blue hrow');
  $(table_id + ' table tr td:nth-child('+Math.round(rate_steps/2+1)+')').addClass('bg-lightest-blue hcol');
  return true;
}

$(document).ready(function() {
  // initialize
  $('#annuity').text('$ '+calculate());
  calculate_table('#range-table');
  $('input[name="principal"]').val(data.principal);
  $('input[name="rate"]').val(data.rate);
  $('input[name="periods"]').val(data.periods);

  $('#calc input').keyup(function() {
    data[$(this).attr('name')] = parseFloat($(this).val());
    $('#annuity').text('$ '+calculate());
    calculate_table('#range-table');
  });

  $('form#calc').submit(function(e) {
    e.preventDefault();
    console.log("Test submit");
  });

});

// input - a numeric amount
// portion - ration of rough step size
// steps - rounded step sizes
function get_range(input, portion, step_sizes = null, steps = 5) {
  let step = input * portion;
  let j = 0;
  if(step_sizes!=null) // if no steps given, skip rounding
    for(let i=0; i < step_sizes.length && step_sizes[i]<=step; i++)
      j = i;
    step = step_sizes[j];
  let out = [];
  for(let i= Math.round(steps/2)-steps; i < Math.round(steps/2); i++)
    out.push(input + i * step);
  return out;
}
function make_row(array) {

}
