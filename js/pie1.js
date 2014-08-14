var window_width = $(window).width();
var window_height = $(window).height();

var width = 350;

if(window_width < 400) {
  width = window_width - 30;
}
    
var height = width;

if(window_height < height) {
  height = window_height - 30;
  width = height;
}
    
var vmargin = 60,
    radius = Math.min(width, height) / 2;

var color = ['rgb(141,211,199)','rgb(255,255,179)','rgb(190,186,218)','rgb(251,128,114)','rgb(128,177,211)','rgb(253,180,98)'];
//var color = ['rgb(127,201,127)','rgb(190,174,212)','rgb(253,192,134)','rgb(255,255,153)','rgb(56,108,176)','rgb(240,2,127)'];

var pie = d3.layout.pie()
    .value(function(d) { return d.dem13; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(1/2 * radius)
    .outerRadius(radius);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height + vmargin)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height + vmargin) / 2 + ")");

var ids = ["BLK","AI","ASN","HSP","WHT","OTH"];
var labels = ["Black","American Indian","Asian","Hispanic","White","Other"];

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset(function() {
  return [this.getBBox().height / 2, 0]
})
  .html(function(d, i) {
    return "<strong>" + labels[i] + "</strong> <span class='badge'>" + (getCurrent(d) * 100).toFixed(2) + "%</span></br><small>of California residents in " + year + "</small>";
  })
  

function getCurrent(d) {
  if(year == 2013) {
    return d.data.dem13;
  }

  else if(year == 2010) {
    return d.data.dem10;
  }

  else if(year == 2005) {
    return d.data.dem05;
  }

  else if(year == 2000) {
    return d.data.dem00;
  }

  else if(year == 1995) {
    return d.data.dem95;
  }

  else if(year == 1990) {
    return d.data.dem90;
  }
  
}

var path;

function value(d) {
  $('#yearDropdown').html(year + ' <span class="caret"></span>');
    if(year == 2013) {
      $('.year').removeClass('active');
      $('#y2013').addClass('active');
      return d['dem13'];
    }

    else if(year == 2010) {
      $('.year').removeClass('active');
      $('#y2010').addClass('active');
      return d['dem10'];
    }

    else if(year == 2005) {
      $('.year').removeClass('active');
      $('#y2005').addClass('active');
      return d['dem05'];
    }

    else if(year == 2000) {
      $('.year').removeClass('active');
      $('#y2000').addClass('active');
      return d['dem00'];
    }

    else if(year == 1995) {
      $('.year').removeClass('active');
      $('#y1995').addClass('active');
      return d['dem95'];
    }

    else if(year == 1990) {
      $('.year').removeClass('active');
      $('#y1990').addClass('active');
      return d['dem90'];
    }
  }

  function change() {
    //var value = this.value;
    //current = value;
    pie.value(function(d) { return value(d); }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(1500).attrTween("d", arcTween); // redraw the arcs
  }

d3.csv("data.csv", function(error, data) {
  path = svg.datum(data).selectAll("path")
      .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) { return color[i]; })
      .attr("d", arc)
      .attr("id", function(d, i) { return ids[i]; })
      .on("mouseover", tip.show)
      .on("mouseout",tip.hide)
      .each(function(d) { this._current = d; }); // store the initial angles

  path.call(tip);

});


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

function changeYear(newYear) {
  year = newYear;
  changeYear2(newYear);
  changeYear3(newYear);
  change();
} 

var interval;

function animate() {
  interval = setInterval(animateHelper,2000);
}

var counter = 0;

function animateHelper() {
  if(counter == 0) {
    changeYear(1990);
  }
  else if(counter == 1) {
    changeYear(1995);
  }
  else if(counter == 2) {
    changeYear(2000);
  }
  else if(counter == 3) {
    changeYear(2005);
  }
  else if(counter == 4) {
    changeYear(2010);
  }
  else if(counter == 5) {
    changeYear(2013);
  }
  else if(counter == 6) {
    clearInterval(interval);
    counter = 0;
    
  }
  counter += 1;
}