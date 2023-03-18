
// Use the D3 library to read in samples.json from the URL as follows
url = "http://127.0.0.1:5000//api/v1.0/emissions";

// Fetch the JSON data and console log it
let xValue = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];

d3.json(url).then(function(data){
    console.log(data);

    // chart init
    let yValue = [data[0].Year_2000,data[0].Year_2001,data[0].Year_2002,data[0].Year_2003,data[0].Year_2004,
          data[0].Year_2005,data[0].Year_2006,data[0].Year_2007,data[0].Year_2008,data[0].Year_2009,
          data[0].Year_2010,data[0].Year_2011,data[0].Year_2012,data[0].Year_2013,data[0].Year_2014,
          data[0].Year_2015,data[0].Year_2016,data[0].Year_2017,data[0].Year_2018,data[0].Year_2019,data[0].Year_2020];

    let country = data[0].country;

    let total_emission_2020 = 0
    for (let i = 0; i< data.length; i++) {
      total_emission_2020 = parseInt(total_emission_2020 + data[i].Year_2020)
      console.log(total_emission_2020)
    }

    let restworld_emission = total_emission_2020 - parseInt(data[0].Year_2020);
    let values = [data[0].Year_2020, restworld_emission];

    emission_trend(xValue, yValue, country);
    emission_percentage (values, country)
    dropdown_value (data);
    top_5_2020(data,donut_chart)
});

// line chart function
function emission_trend (xValue, yValue, country) {
    var trace1 = {
        x: xValue,
        y: yValue,
        mode: "lines+markers",
        name: country + 'Total Emission Trend kilotonnes' 
    };
    var layout = {
        title: country + ' Total Emission Trend<br>(Unit: kilotonnes)'
    }
    var data = [trace1];
    Plotly.newPlot('line', data, layout);
}

//pie chart function
function emission_percentage (values, country) {
    var data = [{
        values: values, 
        labels: [country, 'The rest of world'],
        type: 'pie'
    }];
    var layout = {
        height: 400,
        width: 500,
        title: country + ' Emission % in 2020'
    };
  
    Plotly.newPlot('pie', data, layout);
};

// set dropdown box value
function dropdown_value (items) {
  let options = "";
  for (let i = 0; i < items.length; i++) {
      options += "<option>" + items[i].country + "</option>";
      document.getElementById("selDataset").innerHTML = options
  };
};

d3.selectAll("#selDataset").on("change", getData);

function getData() {
  let dropdownMenu = d3.selectAll("#selDataset");
  let item = dropdownMenu.property("value");

  let index = [];

  d3.json(url).then(function(data){

    for (let j = 0; j < data.length; j++) {
      if (data[j].country == item) {
        index = j;
        console.log(index)
      }
  }
  // chart for dropdown box
  let yValue = [data[index].Year_2000,data[index].Year_2001,data[index].Year_2002,data[index].Year_2003,data[index].Year_2004,
          data[index].Year_2005,data[index].Year_2006,data[index].Year_2007,data[index].Year_2008,data[index].Year_2009,
          data[index].Year_2010,data[index].Year_2011,data[index].Year_2012,data[index].Year_2013,data[index].Year_2014,
          data[index].Year_2015,data[index].Year_2016,data[index].Year_2017,data[index].Year_2018,data[index].Year_2019,data[index].Year_2020];

    let country = data[index].country;

    let total_emission_2020 = parseInt('0')
    for (let i = 0; i< data.length; i++) {
      total_emission_2020 = parseInt(total_emission_2020 + data[i].Year_2020)
      console.log(parseInt(total_emission_2020))
    }

    let restworld_emission = parseInt(total_emission_2020 - data[index].Year_2020);
    let values = [data[index].Year_2020, restworld_emission];

    emission_trend(xValue, yValue, country);
    emission_percentage (values, country)
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// set dropdown box value 2
let options_1 = "<option>" + 'Year_2020' + "</option>" + 
          "<option>" + 'Year_2015' + "</option>" +
          "<option>" + 'Year_2010' + "</option>" +
          "<option>" + 'Year_2005' + "</option>" +
          "<option>" + 'Year_2000' + "</option>"

document.getElementById("selDataset_1").innerHTML = options_1

// function: top 5 contributors
function top_5_2020(data, donut_chart){
  let data_year = [];
  for (let x = 0; x < data.length; x++) {
    data_year.push(parseInt(data[x].Year_2020));
  }
  var topValues = data_year.sort((a,b) => b-a).slice(0,5)

  let top_5_countries = []
  for (let y = 0; y < 5; y ++) {
    for (let z = 0; z < data.length; z++) {
      if (parseInt(topValues[y]) == parseInt(data[z].Year_2020)) {
        top_5_countries.push (data[z].country)
      }
    }
  }
  var donut_chart = donut_chart (topValues, top_5_countries);
  //return console.log(topValues, top_5_countries) 
  return donut_chart
}

function top_5_2015(data, donut_chart){
  let data_year = [];
  for (let x = 0; x < data.length; x++) {
    data_year.push(parseInt(data[x].Year_2015));
  }
  var topValues = data_year.sort((a,b) => b-a).slice(0,5)

  let top_5_countries = []
  for (let y = 0; y < 5; y ++) {
    for (let z = 0; z < data.length; z++) {
      if (parseInt(topValues[y]) == parseInt(data[z].Year_2015)) {
        top_5_countries.push (data[z].country)
      }
    }
  }
  var donut_chart = donut_chart (topValues, top_5_countries) 
  return donut_chart
}

function top_5_2010(data, donut_chart){
  let data_year = [];
  for (let x = 0; x < data.length; x++) {
    data_year.push(parseInt(data[x].Year_2010));
  }
  var topValues = data_year.sort((a,b) => b-a).slice(0,5)

  let top_5_countries = []
  for (let y = 0; y < 5; y ++) {
    for (let z = 0; z < data.length; z++) {
      if (parseInt(topValues[y]) == parseInt(data[z].Year_2010)) {
        top_5_countries.push (data[z].country)
      }
    }
  }
  var donut_chart = donut_chart (topValues, top_5_countries) 
  return donut_chart
}

function top_5_2005(data, donut_chart){
  let data_year = [];
  for (let x = 0; x < data.length; x++) {
    data_year.push(parseInt(data[x].Year_2005));
  }
  var topValues = data_year.sort((a,b) => b-a).slice(0,5)

  let top_5_countries = []
  for (let y = 0; y < 5; y ++) {
    for (let z = 0; z < data.length; z++) {
      if (parseInt(topValues[y]) == parseInt(data[z].Year_2005)) {
        top_5_countries.push (data[z].country)
      }
    }
  }
  var donut_chart = donut_chart (topValues, top_5_countries) 
  return donut_chart
}

function top_5_2000(data, donut_chart){
  let data_year = [];
  for (let x = 0; x < data.length; x++) {
    data_year.push(parseInt(data[x].Year_2000));
  }
  var topValues = data_year.sort((a,b) => b-a).slice(0,5)

  let top_5_countries = []
  for (let y = 0; y < 5; y ++) {
    for (let z = 0; z < data.length; z++) {
      if (parseInt(topValues[y]) == parseInt(data[z].Year_2000)) {
        top_5_countries.push (data[z].country)
      }
    }
  }
  var donut_chart = donut_chart (topValues, top_5_countries) 
  return donut_chart
}

d3.selectAll("#selDataset_1").on("change", getData_1);

function getData_1() {
  let dropdownMenu = d3.selectAll("#selDataset_1");
  let item = dropdownMenu.property("value");
  console.log(item)

  d3.json(url).then(function(data){
    if (item == "Year_2020") {
      top_5_2020(data, donut_chart)
    }
    else if (item == "Year_2015") {
      top_5_2015(data, donut_chart)
    }
    else if (item == "Year_2010") {
      top_5_2010(data, donut_chart)
    }
    else if (item == "Year_2005") {
      top_5_2005(data, donut_chart)
    }
    else if (item == "Year_2000") {
      top_5_2000(data, donut_chart)
    }
  });

}
// function: chart.js donut chart
function donut_chart (data, labels) {
  var ctx = document.getElementById('donut_chart').getContext('2d');
  const existingChart = Chart.getChart(ctx);

  if (existingChart) {
    // If a Chart object already exists, destroy it
    existingChart.destroy();
  }

  new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: [ 
                'rgba(14, 127, 0, .5)',
                'rgba(110, 154, 22, .5)',
                'rgba(170, 202, 42, .5)',
                'rgba(202, 209, 95, .5)',
                'rgba(210, 206, 145, .5)',
                'rgba(170, 202, 42, .5)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        cutoutPercentage: 70,
        responsive: false,
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black',
                fontSize: 14
            }
        }
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Donut Chart
let CO2_data = [16, 15, 12, 6, 5, 4, 42];
let CH4_data = [27, 11, 25, 8, 1, 3, 25];
let elements = ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ]

function GH_Contributor(data1, data2, labels) {
var data = [{
    values: data1,
    labels: labels,
    domain: {column: 0},
    name: 'CH4',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  },{
    values: data2,
    labels: labels,
    text: 'CO2',
    textposition: 'inside',
    domain: {column: 1},
    name: 'CO2 Emissions',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  }];
  
  var layout = {
    title: 'Emissions Resources',
    annotations: [
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'CH4',
        x: 0.17,
        y: 0.5
      },
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'CO2',
        x: 0.82,
        y: 0.5
      }
    ],
    height: 400,
    width: 600,
    showlegend: false,
    grid: {rows: 1, columns: 2}
  };
  
  Plotly.newPlot('Donuts', data, layout);
};

//GH_Contributor(CH4_data, CO2_data, elements)