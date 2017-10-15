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
function calculate_table() {
  let rows = get_range(data.principal, dollar_partial, dollar_step_sizes, dollar_steps);
  let cols = get_range(data.rate, rate_partial, rate_step_sizes, rate_steps);
  console.log(rows);
  console.log(cols);
  let out = [];
  for(let i = 0; i < rows.length; i++) {
    out[i] = [];
    for(let j = 0; j < cols.length; j++) {
      out[i][j] = Math.round(finance.AM(rows[i], cols[j], data.periods, 0),2);
    }
  }
  let table = [[''].concat(cols)];
  for(let i = 0; i < rows.length; i++) {
    table.push(["$ "+rows[i]].concat(out[i]));
  }
  console.log(table);
  let trs = [];
  for(let i = 0; i < table.length; i++) {
    let x= (Math.round(table.length/2) == i ? "bg-light-green" : "");
    trs[i] = "<td class="+x+">"+(table[i]).join("</td><td class="+x+">")+"</td>";
  }
  console.log("<tr>"+trs.join("</tr><tr>")+"</tr>");
  return "<table><tr>"+trs.join("</tr><tr>")+"</tr></table>";
  // 2D array to tr>td>val (row/col/val)
}

$(document).ready(function() {
  // initialize
  $('#annuity').text('$ '+calculate());
  $('#range-table').html(calculate_table());
  $('input[name="principal"]').val(data.principal);
  $('input[name="rate"]').val(data.rate);
  $('input[name="periods"]').val(data.periods);

  $('#calc input').change(function() {
    data[$(this).attr('name')] = parseFloat($(this).val());
    $('#annuity').text('$ '+calculate());
    $('#range-table').html(calculate_table());
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
  console.log(step);
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
