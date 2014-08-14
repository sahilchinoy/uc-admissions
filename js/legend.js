var svgLegend;

function drawLegend() {

  window_width = $(window).width();

  function labelChooser() {
  if (window_width < 400) {
    return ids;
  }
  else {
    return labels;
  }
}

  if(svgLegend) {
    svgLegend.remove();
  }

svgLegend = d3.select("#legend")
  .append("svg")
  .attr("x", 20)
  .attr("width", window_width - 110)
  .attr("height", 40);

var legend = svgLegend.append("g")
  .attr("class", "legend")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", 40)
  .attr("width", window_width - 110);

legend.selectAll('g').data(labels)
  .enter()
  .append('g')
  .each(function(d, i) {
    var g = d3.select(this);

    g.append("rect")
      .attr("x", i*window_width/6)
      .attr("y", 1)
      .attr("width", 20)
      .attr("height", 20)
      .attr("stroke","white")
      .attr("stroke-width", 1)
      .style("fill", color[i]);
    
    g.append("text")
      .attr("dy", 15)
      .style("text-anchor","left")
      .attr("transform","translate(" + (28+ i*window_width/6) + ", 0)rotate(0)")
      .style("fill", "black")
      .style("font-size",10)
      .text(labelChooser()[i]);
  });

}

drawLegend();
window.onresize = drawLegend;