
let area1A, area1B, cn1;
let area2A, area2B, cn2;
let area3A, area3B, cn3;
let area4A, area4B, cn4;

let rain;
let runoffA, runoffB;
let a, b;

let barChart = new BarChart("chart", 0, 0);


let cnNumbers =
    [
        {"land_type":"meadow", "A":30, "B":58, "C":71, "D":78},
        {"land_type":"industrial", "A":81, "B":88, "C":91, "D":93},
        {"land_type":"open space", "A":39, "B":61, "C":74, "D":80},
        {"land_type":"gravel", "A":76, "B":82, "C":89, "D":91},
    ]



function getInputValuesA(){
    area1A = parseFloat(document.getElementById("area-fraction-1A").value);
    area2A = parseFloat(document.getElementById("area-fraction-2A").value);
    area3A = parseFloat(document.getElementById("area-fraction-3A").value);
    area4A = parseFloat(document.getElementById("area-fraction-4A").value);

    rain = parseFloat(document.getElementById("rain-amountA").value);

    var wA = document.getElementById("warningA");

    if((area1A + area2A + area3A + area4A).toFixed(2) != 1.0){
        wA.style.display = "block";
    }

    else{
        wA.style.display = "none";

        a = calculateA();
        updateChart(a, b)
    }

}

function getInputValuesB(){

    area1B = parseFloat(document.getElementById("area-fraction-1B").value);
    area2B= parseFloat(document.getElementById("area-fraction-2B").value);
    area3B = parseFloat(document.getElementById("area-fraction-3B").value);
    area4B = parseFloat(document.getElementById("area-fraction-4B").value);

    rain = parseFloat(document.getElementById("rain-amountA").value);

    var wB = document.getElementById("warningB");


    if((area1B + area2B + area3B + area4B).toFixed(2) != 1.0){
        wB.style.display = "block";
    }
    else{
        wB.style.display = "none";

        b = calculateB();
        updateChart(a, b)
    }

}



function updateSoilGroup(row, scenario){
    let area = parseFloat(document.getElementById(`${"area-fraction-" + row + scenario}`).value);
    let selectedSoilGroup = document.getElementById(`${"soil-select-" + row  + scenario}`).value;

    let cnNumber = 0;
    let object = cnNumbers[row - 1];
    cnNumber = object[selectedSoilGroup];
    document.getElementById(`${"cn" + row  + scenario}`).innerHTML = cnNumber.toFixed(2);

    let rows = document.getElementById(`${"row" + row  + scenario}`);
    let cells = rows.getElementsByTagName("td");
    //cn1 = cells1[3].innerText;
    if(isNaN(area)){
        document.getElementById(`${"weightedAvg" + row  + scenario}`).innerHTML = "--";
    }
    else{
        document.getElementById(`${"weightedAvg" + row  + scenario}`).innerHTML = (parseFloat(cnNumber) * area).toFixed(2);
    }


}

function calculateA(){
    let row1 = document.getElementById("row1A");
    let cells1 = row1.getElementsByTagName("td");
    cn1 = cells1[3].innerText;
    document.getElementById("weightedAvg1A").innerHTML = parseFloat(area1A * cn1).toFixed(2);

    let row2 = document.getElementById("row2A");
    let cells2 = row2.getElementsByTagName("td");
    cn2 = cells2[3].innerText;
    document.getElementById("weightedAvg2A").innerHTML = parseFloat(area2A * cn2).toFixed(2);

    let row3 = document.getElementById("row3A");
    let cells3 = row3.getElementsByTagName("td");
    cn3 = cells3[3].innerText;
    document.getElementById("weightedAvg3A").innerHTML = parseFloat(area3A * cn3).toFixed(2);

    let row4 = document.getElementById("row4A");
    let cells4 = row4.getElementsByTagName("td");
    cn4 = cells4[3].innerText;
    document.getElementById("weightedAvg4A").innerHTML = parseFloat(area4A * cn4).toFixed(2);


    let weightedAvgs = [cells1[4].innerText, cells2[4].innerText, cells3[4].innerText, cells4[4].innerText];
    let cnSum = 0;
    weightedAvgs.forEach(a => cnSum+=parseFloat(a));
    let sums = document.getElementById("sumsA");
    sums.innerHTML = cnSum.toFixed(2);

    let s_value = document.getElementById("s-valueA");
    s_value.innerHTML = ((25400/cnSum)-254).toFixed(2);

    let precip_cm = document.getElementById("precip-cmA");
    precip_cm.innerHTML = document.getElementById("rain-amountA").value * 2.54;


    let precip_mm = (parseFloat(precip_cm.innerText)*10);
    let a = (0.2* parseFloat(s_value.innerText));
    let b = (parseFloat(s_value.innerText) + (0.8*parseFloat(s_value.innerText)));

    runoffA = Math.pow((precip_mm - a), 2)/b;


    //runoff = (((parseFloat(precip_cm.innerText)*10) - (0.2* parseFloat(s_value.innerText)))^2)/(parseFloat(s_value.innerText)+(0.8*parseFloat(s_value.innerText)));

    document.getElementById("runoff-mmA").innerHTML = runoffA.toFixed(2);
    document.getElementById("runoff-cmA").innerHTML = (parseFloat(runoffA)/10).toFixed(2);
    document.getElementById("runoff-inA").innerHTML = (parseFloat(runoffA/10)/2.54).toFixed(2);
    //document.getElementById("runoff-in-displayA").innerHTML = (parseFloat(runoffA/10)/2.54).toFixed(2);

    return runoffA;

}

function calculateB(){
    let row1 = document.getElementById("row1B");
    let cells1 = row1.getElementsByTagName("td");
    cn1 = cells1[3].innerText;
    document.getElementById("weightedAvg1B").innerHTML = parseFloat(area1B * cn1).toFixed(2);

    let row2 = document.getElementById("row2B");
    let cells2 = row2.getElementsByTagName("td");
    cn2 = cells2[3].innerText;
    document.getElementById("weightedAvg2B").innerHTML = parseFloat(area2B * cn2).toFixed(2);

    let row3 = document.getElementById("row3B");
    let cells3 = row3.getElementsByTagName("td");
    cn3 = cells3[3].innerText;
    document.getElementById("weightedAvg3B").innerHTML = parseFloat(area3B * cn3).toFixed(2);

    let row4 = document.getElementById("row4B");
    let cells4 = row4.getElementsByTagName("td");
    cn4 = cells4[3].innerText;
    document.getElementById("weightedAvg4B").innerHTML = parseFloat(area4B * cn4).toFixed(2);


    let weightedAvgsB = [cells1[4].innerText, cells2[4].innerText, cells3[4].innerText, cells4[4].innerText];
    let cnSumB = 0;
    weightedAvgsB.forEach(a => cnSumB+=parseFloat(a));
    let sumsB = document.getElementById("sumsB");
    sumsB.innerHTML = cnSumB.toFixed(2);

    let s_valueB = document.getElementById("s-valueB");
    s_valueB.innerHTML = ((25400/cnSumB)-254).toFixed(2);

    let precip_cmB = document.getElementById("precip-cmB");
    precip_cmB.innerHTML = document.getElementById("rain-amountB").value * 2.54;

    let precip_mmB = (parseFloat(precip_cmB.innerText)*10);
    let a = (0.2* parseFloat(s_valueB.innerText));
    let b = (parseFloat(s_valueB.innerText) + (0.8*parseFloat(s_valueB.innerText)));

    runoffB = Math.pow((precip_mmB - a), 2)/b;


    //runoff = (((parseFloat(precip_cm.innerText)*10) - (0.2* parseFloat(s_value.innerText)))^2)/(parseFloat(s_value.innerText)+(0.8*parseFloat(s_value.innerText)));

    document.getElementById("runoff-mmB").innerHTML = runoffB.toFixed(2);
    document.getElementById("runoff-cmB").innerHTML = (parseFloat(runoffB)/10).toFixed(2);
    document.getElementById("runoff-inB").innerHTML = (parseFloat(runoffB/10)/2.54).toFixed(2);
    //document.getElementById("runoff-in-displayB").innerHTML = (parseFloat(runoffB/10)/2.54).toFixed(2);

    return runoffB;

}

function updateChart(a, b){
    barChart.wrangleData(a, b);
}
