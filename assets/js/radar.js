var radar_margin = { top: 50, right: 80, bottom: 50, left: 80 },
radar_width = Math.min(700, window.innerWidth / 4) - radar_margin.left - radar_margin.right,
radar_height = Math.min(radar_width, window.innerHeight - radar_margin.top - radar_margin.bottom);

var progOpts = {
	w: 200,
	h: 240,
	margin: radar_margin,
	maxValue: 5,
	levels: 5,
	roundStrokes: false,
	color: d3.scaleOrdinal().range(["#EB2C2F", "#FFDD55", "#1384C8"]),
	format: '.0f',
	legend: { title: 'Programming', translateX: 120, translateY: 10 }
};

var radar = d3.select('svg')
	.attr("height", 2600);

radar.append("g")
	.attr("id", "prog")
	.attr("transform","translate(10,2300)");

var dataOpts = {
	w: 200,
	h: 240,
	margin: radar_margin,
	maxValue: 5,
	levels: 5,
	roundStrokes: false,
	color: d3.scaleOrdinal().range(["#24BBEF"]),
	format: '.0f',
	legend: { title: '', translateX: 120, translateY: 10 }
};

radar.append("g")
	.attr("id", "data")
	.attr("transform","translate(360,2300)");

var devopsOpts = {
	w: 200,
	h: 240,
	margin: radar_margin,
	maxValue: 5,
	levels: 5,
	roundStrokes: false,
	color: d3.scaleOrdinal().range(["#63B345"]),
	format: '.0f',
	legend: { title: '', translateX: 120, translateY: 10 }
};

radar.append("g")
	.attr("id", "devops")
	.attr("transform","translate(680,2300)");

d3.json("/assets/data.json", function(error, data) {
	if (error) throw error;
	RadarChart("#prog", data.prog, progOpts);
	RadarChart("#data", data.data, dataOpts);
	RadarChart("#devops", data.devops, devopsOpts);
});

