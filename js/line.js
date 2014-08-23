var admissionsChart;
var toNormalized;

/*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
nv.addGraph(function() {
  var admissionsChart = nv.models.lineChart()
                //.margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(2000)  //how fast do you want the lines to transition?
                .showLegend(false)
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
                //.interpolate("basis")
  ;

  admissionsChart.xAxis     //Chart x-axis settings
      //.axisLabel('Time (ms)')

  admissionsChart.yAxis     //Chart y-axis settings
      //.axisLabel('Voltage (v)')
      .tickFormat( function(d) { return (d * 100).toFixed(1) + '%' });

  d3.select('#admissionsChart svg')
      .datum(admissions)
      .call(admissionsChart);
   
    toNormalized = function() {
        $('#absolute').removeClass('active');
        $('#normalized').addClass('active');
        
        d3.select('#admissionsChart svg')
            .datum(admissionsNormalized);
        
        admissionsChart.update();
    }
    
    toAbsolute = function() {
        $('#absolute').addClass('active');
        $('#normalized').removeClass('active');
        
        d3.select('#admissionsChart svg')
            .datum(admissions);
        
        admissionsChart.update();
    }

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { admissionsChart.update() });
  return admissionsChart;
});


    