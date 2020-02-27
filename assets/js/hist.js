var start_hist = 2001;
var end_hist = 2019;

var periods = [[1,"Corporate environment", 2001, 2008, ""],
                [2, "Social networking", 2008, 2012, ""],
                [3, "Cloud", 2012, 2015, ""],
                [4, "Data Engineering", 2015, 2019, ""]
                ];
        
var events = [
            [2002, "Bachelor's degree in CS", 2002, ""],
            [2004, "Senior Software Engineer", 2004, ""],
            [2009, "NoSQL", 2009, ""],
            [2010, "Tech Lead", 2010, ""],
            [2011, "Hadoop", 2011, ""],
            [2012, "Cloud Architect", 2012, ""],
            [2015, "Big Data", 2015, ""],
            [2017, "NewSQL", 2017, ""]
            ];
        
for (var i = 0; i < events.length; i++) {
    for (var j = 0; j < periods.length; j++) {
        if (events[i][0] >= periods[j][2] && events[i][0] <= periods[j][3]) {
            events[i].push(periods[j][0]);
            break;
        }
    }
}

events.sort(function(a, b) { return (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0)); });

var order = 1; var oldVar;
for (var i = 0; i < events.length; i++) {
    order++;
    if (events[i][0] - oldVar > 100 || order >= 27) {
        order = 1;
    }
    events[i].push(order);
    oldVar = events[i][0];
}

var hist_margin = {top: 20, right: 40, bottom: 20, left: 14},
hist_width = 1024 - hist_margin.left - hist_margin.right,
hist_height = 380 - hist_margin.top - hist_margin.bottom;

var formatNumber = d3.format("1d");

var x_hist = d3.scaleLinear()
    .domain([start_hist, end_hist])
    .range([0, width]);
    
var y_hist = d3.scaleLinear()
        .domain([0, 12])
        .range([0, hist_height]);

var xAxis_hist = d3.axisBottom(x_hist)
    .ticks(19)
    .tickFormat(formatNumber);	

var hist = d3.select("section").append("svg")
    .attr("width", hist_width + hist_margin.left + hist_margin.right)
    .attr("height", hist_height + hist_margin.top + hist_margin.bottom)
    .append("g")
    .attr("transform", "translate(" + hist_margin.left + "," + hist_margin.top + ")");

var gx = hist.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + hist_height + ")")
    .call(xAxis_hist);
    
var bar = 30;		
hist.append("g").selectAll("periode")
        .data(periods)
        .enter().append("rect")
        .attr("class", "periode")
        .attr("x", function(d) {return x_hist(d[2]);})
        .attr("y", function(d) {if (d[0] % 2 == 0) return hist_height - (bar + 4); else return hist_height - (bar + 4) * 2;}  )
        .attr("width", function(d) {return x_hist(d[3]) - x_hist(d[2]);})
        .attr("height", bar)
        .attr("fill", function(d) {  return "hsl(" + (270 - d[0] * 19) + ",50%,50%)" });
        //~ .on("mouseover", function(d) { d3.select("#hist_period" + d[0]).style("display", "block");})
        //~ .on("mouseout", function(d) { d3.select("#hist_period" + d[0]).style("display", "none");});
        
hist.append("g").selectAll(".hist_period")
        .data(periods)
        .enter()
        .append("a")
        /*.attr("xlink:href", function(d) {return d[4];})*/
        .append("text")
        .text(function(d) {return d[1];})
        .attr("class", "hist_period")
        .attr ("id", function(d) {return "hist_period" + d[0];})
        .attr("text-anchor", "middle")
        .attr("x", function(d) {return x_hist((d[2] + d[3]) / 2);})
        .attr("y", function(d) {if (d[0] % 2 == 0) return hist_height - (bar + 4); else return hist_height - (bar + 4) * 2;}  )
        .attr("dy", "1.5em")
        .attr("font-weight", "bold");
        //~ .on("mouseover", function(d) { d3.select("#hist_period" + d[0]).style("display", "block");})
        //~ .on("mouseout", function(d) { d3.select("#hist_period" + d[0]).style("display", "none");});
                
hist.append("g").selectAll("hist_line")
        .data(events)
        .enter().append("line")
        .attr("class", "hist_line")
        .attr("x1", function(d) {return x_hist(d[0]);})
        .attr("y1", function(d) {if (d[4] % 2 == 0) return hist_height - bar; else return hist_height - bar * 2;})
        .attr("x2", function(d) {return x_hist(d[0]);})
        .attr("y2", function(d) {return y_hist(d[5]);})
        .attr("stroke", "grey");

var titres = hist.append("g").selectAll("hist_event")
        .data(events)
        .enter()
        .append("a")
        /*.attr("xlink:href", function(d){if (d[3] === "") return "http://www.imdb.com/find?q=" + d[1] + " " + d[2] + "&s=tt"; else return d[3];})*/
        .attr("class", function(d) {return "hist_event";});
titres.append("text")
        .text(function(d) {return d[1] + " (" +  d[2] + ")";})
        .attr("text-anchor", "left")
        .attr("x", function(d) {return x_hist(d[0]);}  )
        .attr("y", function(d) {return y_hist(d[5]);} )
        .attr("dy", "0.75em")
        .attr("dx", "0.25em");