var pie2 = d3.layout.pie()
    .value(function(d) { return d.app13; })
    .sort(null);

var arc2 = d3.svg.arc()
    .innerRadius(1/2 * radius)
    .outerRadius(radius);

var svg2 = d3.select("#chart2").append("svg")
    .attr("width", width)
    .attr("height", height + vmargin)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height + vmargin) / 2 + ")");

var ids = ["AA","AI","AS","LA","WH"];
var labels = ["African American","American Indian","Asian","Hispanic","White"];

var path2;

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset(function() {
  return [this.getBBox().height / 2, 0]
})
  .html(function(d, i) {
    return "<strong>" + labels[i] + "</strong> " + getCurrent2(d);
  })
  

function getCurrent2(d) {
  if(year == 2013) {
    return "<span class='badge'>" + d.data.app13 + "%</span></br><small>of UC applicants in 2013</small>";
  }

  else if(year == 2010) {
    return "<span class='badge'>" + d.data.app10 + "%</span></br><small>of UC applicants in 2010</small>";
  }

  else if(year == 2005) {
    return "<span class='badge'>" + d.data.app05 + "%</span></br><small>of UC applicants in 2005</small>";
  }

  else if(year == 2000) {
    return "<span class='badge'>" + d.data.app00 + "%</span></br><small>of UC applicants in 2000</small>";
  }

  else if(year == 1995) {
    return "<span class='badge'>" + d.data.app95 + "%</span></br><small>of UC applicants in 1995</small>";
  }

  else if(year == 1990) {
    return "<span class='badge'>" + d.data.app90 + "%</span></br><small>of UC applicants in 1990</small>";
  }
  
}

function value2(d) {
	if(year2 == 2013) {
	   return d['app13'];
	}
	else if(year2 == 2010) {
	   return d['app10'];
	}
	else if(year2 == 2005) {
	   return d['app05'];
	}
	else if(year2 == 2000) {
	   return d['app00'];
	}
	else if(year2 == 1995) {
	    return d['app95'];
	}
	else if(year2 == 1990) {
	    return d['app90'];
	}
}

  function change2() {
  	console.log('got here');
    pie2.value(function(d) { return value2(d); }); // change the value function
    console.log('here2');
    path2 = path2.data(pie2); // compute the new angles
    path2.transition().duration(1500).attrTween("d", arcTween2); // redraw the arcs
  }

d3.csv("data.csv", function(error, data) {
  path2 = svg2.datum(data).selectAll("path")
      .data(pie2)
    .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc2)
      .on("mouseover", tip2.show)
      .on("mouseout",tip2.hide)
      .each(function(d) { this._current2 = d; }); // store the initial angles

  path2.call(tip2);
});


// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween2(a) {
  var i2 = d3.interpolate(this._current2, a);
  this._current2 = i2(0);
  return function(t) {
    return arc2(i2(t));
  };
}

var year2 = 2013;
var type2 = 'app';

function changeYear2(newYear) {
  year2 = newYear;
  change2();
} 