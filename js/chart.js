
var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d.dem13; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var ids = ["AA","AI","AS","LA","WH"];
var labels = ["African American","American Indian","Asian","Hispanic","White"];

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset(function() {
  return [this.getBBox().height / 2, 0]
})
  .html(function(d, i) {
    return "<strong>" + labels[i] + "</strong> " + getCurrent(d);
  })
  
var current = "dem13";

function getCurrent(d) {
  if(current == "dem13") {
    return "<span class='badge'>" + d.data.dem13 + "%</span></br><small>of California residents in 2013</small>";
  }
  else if(current == "app13") {
    return "<span class='badge'>" + d.data.app13 + "%</span></br><small>of UC applicants in 2013</small>";
  }
  else if(current == "acc13") {
    return "<span class='badge'>" + d.data.acc13 + "%</span></br><small>of UC applicants accepted in 2013</small>";
  }
  else if(current == "dem90") {
    return "<span class='badge'>" + d.data.dem90 + "%</span></br><small>of California residents in 1990</small>";
  }
  else if(current == "app90") {
    return "<span class='badge'>" + d.data.app90 + "%</span></br><small>of UC applicants in 1990</small>";
  }
  else if(current == "acc90") {
    return "<span class='badge'>" + d.data.acc90 + "%</span></br><small>of UC applicants accepted in 1990</small>";
  }
  else if(current == "dem00") {
    return "<span class='badge'>" + d.data.dem00 + "%</span></br><small>of California residents in 2000</small>";
  }
  else if(current == "app00") {
    return "<span class='badge'>" + d.data.app00 + "%</span></br><small>of UC applicants in 2000</small>";
  }
  else if(current == "acc00") {
    return "<span class='badge'>" + d.data.acc00 + "%</span></br><small>of UC applicants accepted in 2000</small>";
  }
}

d3.csv("data.csv", function(error, data) {
  var path = svg.datum(data).selectAll("path")
      .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc)
      .attr("id", function(d, i) { return ids[i]; })
      .on("mouseover", tip.show)
      .on("mouseout",tip.hide)
      .each(function(d) { this._current = d; }); // store the initial angles

  path.call(tip)

  d3.selectAll("input")
      .on("change", change);

  function change() {
    var value = this.value;
    current = value;
    pie.value(function(d) { return d[value]; }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(2000).attrTween("d", arcTween); // redraw the arcs
  }
});

d3.selectAll("path").append("text")
            .attr("text-anchor", "middle")
            .text(this.id);

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}