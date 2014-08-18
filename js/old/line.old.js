var graph = new Rickshaw.Graph( {
	element: document.getElementById("line"),
	width: container_width - 30,
	height: 300,
	padding: {top: 0.02, left: 0.02, right: 0.02, bottom: 0.02},
	renderer: 'line',
	series: [
		{
			color: color[0],
			data: black,
			name: 'Black'
		},
		{
			color: color[1],
			data: americanIndian,
			name: 'American Indian'
		},
		{
			color: color[2],
			data: asian,
			name: 'Asian'
		},
		{
			color: color[3],
			data: hispanic,
			name: 'Hispanic'
		},
		{
			color: color[4],
			data: white,
			name: 'White'
		}
	],
	min: 'auto'
} );

function formatter(y) {
	return y * 100 + '%';
}

var x_axis = new Rickshaw.Graph.Axis.X( { graph: graph } );

var y_axis = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        orientation: 'left',
        tickFormat: formatter,
        ticks: 10,
        element: document.getElementById('y_axis'),
} );

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
	graph: graph,
	xFormatter: function(x) { return x },
	yFormatter: function(y) { return "<span class='badge'>" + (y * 100).toFixed(2) + "% </span>" }
} );

graph.render();


