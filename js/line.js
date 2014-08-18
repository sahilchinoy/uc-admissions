nv.addGraph(function() {
  var chart = nv.models.lineChart()
                //.margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(false)
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
                .interpolate("basis")
  ;

  chart.xAxis     //Chart x-axis settings
      //.axisLabel('Time (ms)')

  chart.yAxis     //Chart y-axis settings
      //.axisLabel('Voltage (v)')
      .tickFormat( function(d) { return (d * 100).toFixed(2) + '%' });

  d3.select('#lineChart svg')    //Select the <svg> element you want to render the chart in.   
      .datum(lineData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});