google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

let votes1 = JSON.parse(localStorage.getItem("votes1"));
let votes2 = JSON.parse(localStorage.getItem("votes2"));
let times1 = [];
let times2 = [];
let comics = [];
let characters = [];

function calculate() {
    if(votes1 == null){
        votes1 = [];
    }
    if(votes2 == null){
        votes2 = [];
    }
    for (let i = 0; i < votes1.length; i++) {
        if (comics.indexOf(votes1[i].comic) == -1) {
            comics.push(votes1[i].comic);
            times1.push(1);
        } else {
            times1[comics.indexOf(votes1[i].comic)]++;
        }
    }
    for (let i = 0; i < votes2.length; i++) {
        if (characters.indexOf(votes2[i].comic) == -1) {
            characters.push(votes2[i].comic);
            times2.push(1);
        } else {
            times2[characters.indexOf(votes2[i].comic)]++;
        }
    }
}


function drawChart() {
    var tts = "Resultados de la votación: ";
    calculate();
    var data1 = new google.visualization.DataTable();
    data1.addColumn('string', 'Comic');
    data1.addColumn('number', 'Votes');
    var data2 = new google.visualization.DataTable();
    data2.addColumn('string', 'Character');
    data2.addColumn('number', 'Votes');
    if(comics.length != 0){
        for (let i = 0; i < comics.length; i++) {
            data1.addRow([comics[i], times1[i]]);
        }
    }
    if(characters.lenth != 0){
        for (let i = 0; i < characters.length; i++) {
            data2.addRow([characters[i], times2[i]]);
        }
    }



    // Set chart options
    var options1 = {
        'title': 'Votos al mejor comic',
        'width': 0.7 * window.innerWidth,
        'height': 0.5 * window.innerHeight,
        is3D: true
    };
    var options2 = {
        'title': 'Votos al mejor personaje',
        'width': 0.7 * window.innerWidth,
        'height': 0.5 * window.innerHeight,
        is3D: true
    };

    // Instantiate and draw our chart, passing in some options.
    $("#tabs").tabs();
    var chart1 = new google.visualization.PieChart(document.getElementById('chartDiv1'));
    var chart2 = new google.visualization.AreaChart(document.getElementById("chartDiv2"));
    var chart3 = new google.visualization.ColumnChart(document.getElementById("chartDiv3"));
    var chart4 = new google.visualization.PieChart(document.getElementById('chartDiv4'));
    var chart5 = new google.visualization.AreaChart(document.getElementById("chartDiv5"));
    var chart6 = new google.visualization.ColumnChart(document.getElementById("chartDiv6"));
    chart1.draw(data1, options1);
    chart2.draw(data1, options1);
    chart3.draw(data1, options1);
    chart4.draw(data2, options2);
    chart5.draw(data2, options2);
    chart6.draw(data2, options2);
}