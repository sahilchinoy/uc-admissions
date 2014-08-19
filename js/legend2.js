
var svgLegend2;

function drawLegend2() {

var legend_colors =['rgb(228,26,28)','rgb(55,126,184)','rgb(77,175,74)','rgb(152,78,163)','rgb(255,127,0)','rgb(0,0,0)']

var ids = ["WHT","HSP","ASN","BLK","AI","OVL"];

var labels = ["White","Hispanic","Asian","Black","American Indian","Overall"];


  var container_width = $('#container').width();

  function labelChooser() {
    if (container_width < 700) {
      return ids;
    }
    else {
      return labels;
    }
  }

  if(svgLegend2) {
    svgLegend2.remove();
  }

svgLegend2 = d3.select("#legend2")
  .append("svg")
  .attr("x", 20)
  .attr("width", container_width)
  .attr("height", 40);

var legend2 = svgLegend2.append("g")
  .attr("class", "legend")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", 40)
  .attr("width", container_width - 110);

legend2.selectAll('g').data(labels)
  .enter()
  .append('g')
  .each(function(d, i) {
    var g = d3.select(this);

    g.append("rect")
      .attr("x", i*container_width/6)
      .attr("y", 1)
      .attr("width", 20)
      .attr("height", 20)
      .attr("stroke","white")
      .attr("stroke-width", 1)
      .style("fill", legend_colors[i]);
    
    g.append("text")
      .attr("dy", 15)
      .style("text-anchor","left")
      .attr("transform","translate(" + (28+ i*container_width/6) + ", 0)rotate(0)")
      .style("fill", "grey")
      .style("font-weight", "bold")
      .style("font-size",11)
      .text(labelChooser()[i]);
  });

}

function drawLegends() {
    drawLegend();
    drawLegend2();
}

drawLegend2();
window.onresize = drawLegends;