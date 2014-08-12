
var width = 400,
    height = 400,
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
  if(year == 2013) {
    if(type == 'dem') {
      return "<span class='badge'>" + d.data.dem13 + "%</span></br><small>of California residents in 2013</small>";
    }
    else if(type == 'app') {
      return "<span class='badge'>" + d.data.app13 + "%</span></br><small>of UC applicants in 2013</small>";
    }
    else if(type == 'acc') {
      return "<span class='badge'>" + d.data.acc13 + "%</span></br><small>of UC applicants accepted in 2013</small>";
    }
  }

  else if(year == 2000) {
    if(type == 'dem') {
      return "<span class='badge'>" + d.data.dem00 + "%</span></br><small>of California residents in 2000</small>";
    }
    else if(type == 'app') {
      return "<span class='badge'>" + d.data.app00 + "%</span></br><small>of UC applicants in 2000</small>";
    }
    else if(type == 'acc') {
      return "<span class='badge'>" + d.data.acc00 + "%</span></br><small>of UC applicants accepted in 2000</small>";
    }
  }

  else if(year == 1995) {
    if(type == 'dem') {
      return "<span class='badge'>" + d.data.dem95 + "%</span></br><small>of California residents in 1995</small>";
    }
    else if(type == 'app') {
      return "<span class='badge'>" + d.data.app95 + "%</span></br><small>of UC applicants in 1995</small>";
    }
    else if(type == 'acc') {
      return "<span class='badge'>" + d.data.acc95 + "%</span></br><small>of UC applicants accepted in 1995</small>";
    }
  }

  else if(year == 1990) {
    if(type == 'dem') {
      return "<span class='badge'>" + d.data.dem90 + "%</span></br><small>of California residents in 1990</small>";
    }
    else if(type == 'app') {
      return "<span class='badge'>" + d.data.app90 + "%</span></br><small>of UC applicants in 1990</small>";
    }
    else if(type == 'acc') {
      return "<span class='badge'>" + d.data.acc90 + "%</span></br><small>of UC applicants accepted in 1990</small>";
    }
  }
  
}

var path;

function value(d) {
    if(year == 2013) {
      $('.year').removeClass('active');
      $('#y2013').addClass('active');
      if(type == 'dem') {
        return d['dem13'];
      }
      else if(type == 'app') {
        return d['app13'];
      }
      else if(type == 'acc') {
        return d['acc13'];
      }
    }

    else if(year == 2000) {
      $('.year').removeClass('active');
      $('#y2000').addClass('active');
      if(type == 'dem') {
        return d['dem00'];
      }
      else if(type == 'app') {
        return d['app00'];
      }
      else if(type == 'acc') {
        return d['acc00'];
      }
    }

    else if(year == 1995) {
      $('.year').removeClass('active');
      $('#y1995').addClass('active');
      if(type == 'dem') {
        return d['dem95'];
      }
      else if(type == 'app') {
        return d['app95'];
      }
      else if(type == 'acc') {
        return d['acc95'];
      }
    }

    else if(year == 1990) {
      $('.year').removeClass('active');
      $('#y1990').addClass('active');
      if(type == 'dem') {
        return d['dem90'];
      }
      else if(type == 'app') {
        return d['app90'];
      }
      else if(type == 'acc') {
        return d['acc90'];
      }
    }
  }

  function change() {
    //var value = this.value;
    //current = value;
    pie.value(function(d) { return value(d); }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(2000).attrTween("d", arcTween); // redraw the arcs
  }

d3.csv("data.csv", function(error, data) {
  path = svg.datum(data).selectAll("path")
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

var year = 2013;
var type = 'dem';

function changeYear(newYear) {
  year = newYear;
  change();
} 

function changeType(newType) {
  type = newType;
  change();
}

function animate() {
  setInterval(animateHelper,2000);
}

var counter = 0;

function animateHelper() {
  console.log('here 2');
  if(counter == 0) {
    console.log('here 3');
    changeYear(1990);
  }
  else if(counter == 1) {
    changeYear(1995);
  }
  else if(counter == 2) {
    changeYear(2000);
  }
  else if(counter == 3) {
    changeYear(2013);
  }
  else if(counter == 4) {
    return true;
  }
  counter += 1;
}