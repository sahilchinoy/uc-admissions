var chart;
var year = 2014;

function tooltipContent(series,type,data) {

    var ending;
    
    if(type == 'California demographics') {
        ending = 'of California residents in ';
    }
    else if(type == 'UC applicants') {
        ending = 'of UC applicants for ';
    }
    else if(type == 'UC applicants accepted') {
        ending = 'of UC applicants accepted for ';
    }
    
    return  series + '&nbsp;<strong>' + data + '</strong></br><small> ' + ending + year + '</small>';
}

nv.addGraph(function() {
    chart = nv.models.multiBarChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .tooltipContent(tooltipContent)
        .transitionDuration(500)
        .showLegend(false);
    
    chart.yAxis
        .axisLabel('Percent')
        .tickFormat(function(d) { return d.toFixed(1) + '%' } );
    
    chart.multibar.stacked(true); // default to stacked
    chart.showControls(false); // don't show controls

    d3.select('#barChart svg')
        .datum(barData.y14)
      .transition().duration(500).call(chart);

    nv.utils.windowResize(chart.update);
    
    yScale();

    return chart;
});

function changeYear(newYear) {
    year = newYear;
    $('#yearDropdown').html('<strong>' + year + '</strong> <span class="caret"></span>');
    $('.year').removeClass('active');
    
    if(year == 2014) {
        $('#y14').addClass('active');
        var newData = barData.y14;
    }
    else if(year == 2010) {
        $('#y10').addClass('active');
        var newData = barData.y10;
    }
    else if(year == 2005) {
        $('#y05').addClass('active');
        var newData = barData.y05;
    }
    else if(year == 2000) {
        $('#y00').addClass('active');
        var newData = barData.y00;
    }
    else if(year == 1995) {
        $('#y95').addClass('active');
        var newData = barData.y95;
    }
    else if(year == 1990) {
        $('#y90').addClass('active');
        var newData = barData.y90;
    }
    
    d3.select('#barChart svg')
        .datum(newData)
        .transition().duration(2000).call(chart);
}

function toStacked() {
    $('#grouped').removeClass('active');
    $('#stacked').addClass('active');
    chart.multibar.stacked(true);
    yScale();
    chart.update();
}

function toGrouped() {
    $('#grouped').addClass('active');
    $('#stacked').removeClass('active');
    chart.multibar.stacked(false);
    yScale();
    chart.update();
}

function yScale() {
    if(chart.stacked()) {
        chart.yDomain([0,100]);
    }
    else {
        chart.yDomain([0,60]);
    }
    chart.update();
}

var interval;
var animated = false;

function setButton(state) {
  var button = $('#animateBtn');
  if(state == false) {
    button.html('<strong>Animate <span class="glyphicon glyphicon-play"></span></strong>');
    button.removeClass('btn-warning');
    button.addClass('btn-success');
  }
  else {
    button.html('<strong>Animate <span class="glyphicon glyphicon-pause"></span></strong>');
    button.removeClass('btn-success');
    button.addClass('btn-warning');
  }
}

function animate_bar() {
    console.log('animating');
  if(animated == true) {
    clearInterval(interval);
    setButton(false);
    animated = false;
    return;
  }
  else {
    animated = true;
    setButton(true);
    interval = setInterval(animateHelper,2000);
  }
}

var counter = 0;

function animateHelper() {
  if(year == 2014) {
    changeYear(1990);
  }
  else if(year == 1990) {
    changeYear(1995);
  }
  else if(year == 1995) {
    changeYear(2000);
  }
  else if(year == 2000) {
    changeYear(2005);
  }
  else if(year == 2005) {
    changeYear(2010);
  }
  else if(year == 2010) {
    changeYear(2014);
    clearInterval(interval);
    setButton(false);
    animated = false;
  }
  counter += 1;
}