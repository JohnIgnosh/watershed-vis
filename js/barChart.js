class BarChart{

    constructor(parentElement) {
        this.parentElement = parentElement;
        this.bars = ["A", "B", "Difference"]
        this.displayData = [];


        this.initVis();
    }

    initVis(){
        let vis = this;

        vis.margin = { top: 20, right: 0, bottom: 30, left: 40 };

        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;


        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.x = d3.scaleBand()
            .domain(["A", "B", "Difference"])
            .range([0, vis.width])
            .padding(0.1);


        vis.y = d3.scaleLinear()
            .domain([0, 1])
            .range([vis.height, 0]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.svg.append("text").text("Runoff Amounts")
            .attr("class", "chart-title")
            .attr("x", vis.height/2 - vis.margin.left)
            .attr("y", 0)
            .attr("font-size", "20px")
            .attr("font-weight", "bold")

        vis.svg.append('g')
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(d3.axisBottom(vis.x))
            .attr("font-size", "14px")


        vis.svg.append('g')
            .attr("class", "y-axis")
            .call(d3.axisLeft(vis.y))



        vis.wrangleData();


    }

    wrangleData(runoffA, runoffB){
        let vis = this;

        //vis.svg.selectAll("text").remove();

        vis.displayData = [];

        //let runoffA = document.getElementById("runoff-inA").innerHTML;
        vis.runoffA = parseFloat(runoffA/10)/2.54
        vis.runoffB = parseFloat(runoffB/10)/2.54


        vis.displayData.push(vis.runoffA);
        vis.displayData.push(vis.runoffB);
        vis.displayData.push(Math.abs(vis.runoffA - vis.runoffB));




        vis.updateVis();
    }

    updateVis(){
        let vis = this;

        vis.y.domain([0, d3.max(vis.displayData) + 1]);

        vis.svg.selectAll(".label").remove();



        var bars = vis.svg.selectAll("rect")
            .data(vis.displayData);


        bars.enter()
            .append("rect")
            .merge(bars)
            .transition()
            .duration(500)
            .attr("fill", "#69b3a2")
            .attr("x", function(d, i) { return vis.x(vis.bars[i]); })
            .attr("width", vis.x.bandwidth())
            .attr("height", function(d) {
                if(isNaN(d)) return 0;
                return vis.height - vis.y(d); })
            .attr("y", function(d){return vis.y(d);})


        var labels = vis.svg.selectAll(".label")
            .data(vis.displayData)

        labels.exit()
            .transition()
            .duration(1000).remove();

        labels.enter()
            .append("text")
            .attr("class", "label")
            .attr("x", function(d, i){
                return vis.x(vis.bars[i]) + vis.x.bandwidth()/2;;
            })
            .transition()
            .duration(1000)
            .attr("y", function(d){
                return vis.y(d) - 5;
            })
            .text(function(d) {
                if(isNaN(d)) return "";
                return d.toFixed(2) + " in.";
            })
            .attr("font-family" , "sans-serif")
            .attr("font-size" , "14px")
            .attr("fill" , "black")
            .attr("text-anchor", "middle");


        bars.exit().remove();


        vis.svg.select(".y-axis")
            .transition()
            .duration(500)
            .call(vis.yAxis);








    }







}