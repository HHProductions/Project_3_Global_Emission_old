const url = 'http://localhost:5000/api/countries'


function createMap(countryMarkers, top_10, otherMarkers) {

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let natGeo =L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});

          
          let countries = L.layerGroup(countryMarkers);
          let top_10_countries = L.layerGroup(top_10);
          let other_info = L.layerGroup(otherMarkers);
          
          
          
          
          
          // Create a baseMaps object.
          let baseMaps = {
            "Street Map": street,
            "Nat Geo Map": natGeo,
          };
          
          // Create an overlay object.
          let overlayMaps = {
            "Country Emmisions": countries,
            "Top 10 Countries": top_10_countries,
            "Other Info": other_info
          };
          
          // Define a map object.
let myMap = L.map("map", {
  center: [	31.1231, 70.7790],
  zoom: 3,
  layers: [street, countries, top_10_countries, other_info]
});

//       radius: markerSize(data[i].totCO2_2020)
// Pass our map layers to our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(myMap);

}

function createMarkers(response){
  
  let countryMarkers = [];
  let top_10 = [];
  let population = [];
  
  for (let i = 0; i < response.length; i++) {
    
    var marker = "<strong>Name: </strong>" + response[i].country + "<br><strong>Total Year 2020 Emissions (mmt):</strong> " + response[i].totCO2_2020 + "<br><strong> Rank: </strong>" + response[i].rank;
    
    var latlng = L.latLng(response[i].latitude, response[i].longitude);
    
    countryMarkers.push(
      L.circle(latlng, {
        stroke: false,
        fillOpacity: 0.6,
        color: "Red",
        fillColor: "Red",
        radius: response[i].totCO2_2020 * 100
      }).bindTooltip(marker)
      );
    }
    
    for (let i = 0; i < response.length; i++) {
      
      var marker = "<strong>Name: </strong>" + response[i].country + "<br><strong>Total Year 2020 Emissions (mmt): </strong>" + response[i].totCO2_2020 + "<br><strong> Rank: </strong>" + response[i].rank;
      
      var latlng = L.latLng(response[i].latitude, response[i].longitude);
      
      if (response[i].rank <= 10) {
        top_10.push(
          L.circle(latlng, {
            stroke: false,
            fillOpacity: 0.6,
            color: "Blue",
            fillColor: "Blue",
              radius: response[i].totCO2_2020 * 100
            }).bindTooltip(marker)
            );
          }
        }
        
        
        for (let i = 0; i < response.length; i++) {
          
          var pop_in_1000 = response[i].pop2023/1000
          var marker = "<strong>Name: </strong>" + response[i].country + "<strong><br>Total Population 2023 (1000's): </strong>" + pop_in_1000 + "<strong><br> Region: </strong>" + response[i].region + "<strong><br>Total Land Area(Km): </strong>" + response[i].landAreaKm;
          
          var latlng = L.latLng(response[i].latitude, response[i].longitude);
          
          population.push(
            L.circle(latlng, {
              stroke: false,
              fillOpacity: 0.8,
              color: "Grey",
              fillColor: "Grey",
              radius: response[i].totCO2_2020 * 100
            }).bindTooltip(marker)
            );
          }
          createMap(countryMarkers, top_10, population);
        }
        d3.json(url).then(createMarkers);
        
        
        
        
        
        
        
        
        
        // function x(poly_data){
        
        //   ch_layer = L.geoJson(JSON.parse(poly_data));
        //   return ch_layer;
        // }
        
        // y = x();
        // console.log(y);
        
        // fetch(poly_url)
        // .then(response => response.text())
        // .then(poly_data => x(poly_data))