var graph = new Rickshaw.Graph( {
	element: document.getElementById("line"),
	width: window_width - 170,
	height: 300,
	padding: {top: 0.02, left: 0.02, right: 0.02, bottom: 0.02},
	renderer: 'line',
	series: [
		{
			color: 'rgb(141,211,199)',
			data: black,
			name: 'Black'
		},
		{
			color: 'rgb(255,255,179)',
			data: americanIndian,
			name: 'American Indian'
		},
		{
			color: 'rgb(190,186,218)',
			data: asian,
			name: 'Asian'
		},
		{
			color: 'rgb(251,128,114)',
			data: hispanic,
			name: 'Hispanic'
		},
		{
			color: 'rgb(128,177,211)',
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
	yFormatter: function(y) { return (y * 100).toFixed(2) + "%" }
} );

graph.render();


