var pie3 = d3.layout.pie()
    .value(function(d) { return d.acc13; })
    .sort(null);

var arc3 = d3.svg.arc()
    .innerRadius(1/2 * radius)
    .outerRadius(radius);

var svg3 = d3.select("#accPie").append("svg")
    .attr("width", width)
    .attr("height", height + vmargin)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height + vmargin) / 2 + ")");

var path3;

var tip3 = d3.tip()
  .attr('class', 'd3-tip')
  .offset(function() {
  return [this.getBBox().height / 2, 0]
})
  .html(function(d, i) {
    return "<strong>" + labels[i] + "</strong> <span class='badge'>" + (getCurrent3(d) * 100).toFixed(2) + "%</span></br><small>of UC applicants accepted in " + year + "</small>";
  })
  

function getCurrent3(d) {
  if(year == 2013) {
    return d.data.acc13;
  }

  else if(year == 2010) {
    return d.data.acc10;
  }

  else if(year == 2005) {
    return d.data.acc05;
  }

  else if(year == 2000) {
    return d.data.acc00;
  }

  else if(year == 1995) {
    return d.data.acc95;
  }

  else if(year == 1990) {
    return d.data.acc90;
  }
  
}

function value3(d) {
	if(year == 2013) {
	   return d['acc13'];
	}
	else if(year == 2010) {
	   return d['acc10'];
	}
	else if(year == 2005) {
	   return d['acc05'];
	}
	else if(year == 2000) {
	   return d['acc00'];
	}
	else if(year == 1995) {
	    return d['acc95'];
	}
	else if(year == 1990) {
	    return d['acc90'];
	}
}

  function change3() {
    pie3.value(function(d) { return value3(d); }); // change the value function
    path3 = path3.data(pie3); // compute the new angles
    path3.transition().duration(1500).attrTween("d", arcTween3); // redraw the arcs
  }

d3.csv("data.csv", function(error, data) {
  path3 = svg3.datum(data).selectAll("path")
      .data(pie3)
    .enter().append("path")
      .attr("fill", function(d, i) { return color[i]; })
      .attr("d", arc3)
      .on("mouseover", tip3.show)
      .on("mouseout",tip3.hide)
      .each(function(d) { this._current3 = d; }); // store the initial angles

  path3.call(tip3);
});


// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween3(a) {
  var i3 = d3.interpolate(this._current3, a);
  this._current3 = i3(0);
  return function(t) {
    return arc3(i3(t));
  };
}

var type3 = 'acc';

function changeYear3(newYear) {
  change3();
} 