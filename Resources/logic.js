


// A function to determine the marker size based on the population
function markerSize(population) {
    return Math.sqrt(population) * 50;}


let locations = [
    {
      coordinates: [34.3042, 66.1206],
      country: {
        name: "Afghanistan",
        emmisions: 818900
      }
    },
    {
      coordinates: [31.1231, 70.7790],
      country: {
        name: "Pakistan",
        emmisions: 6649159
      }
    },

    {
     coordinates: [40.3688, 83.1357],
    country: {
            name: "China",
            emmisions: 5221170
    }},
        
        {
          coordinates: [23.1975, 79.5225],
          country: {
            name: "India",
            emmisions: 2681633
          }}

];



// Define arrays to hold the created city and state markers.
let countryMarkers = [];
// let stateMarkers = [];

// Loop through locations, and create the city and state markers.
for (let i = 0; i < locations.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  // var marker = 'emissions : ${locations[i].country.emmisions} <br> name : ${locations[i].country.name}';
  var marker = "emissions : " + locations[i].country.emmisions + "<br>  name : " +locations[i].country.name;


  countryMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.4,
      color: "Red",
      fillColor: "Red",
      radius: markerSize(locations[i].country.emmisions)
    }).bindTooltip(marker)
  );

};

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create two separate layer groups: one for the city markers and another for the state markers.
let countries = L.layerGroup(countryMarkers);
// let cities = L.layerGroup(cityMarkers);

// Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// Create an overlay object.
let overlayMaps = {
  "Country Emmisions": countries,
//   "City Population": cities
};

// Define a map object.
let myMap = L.map("map", {
  center: [	31.1231, 70.7790],
  zoom: 5,
  layers: [street, countries]
});

// Pass our map layers to our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


var markerCoordinates = []

for (let i = 0; i < locations.length; i++) {
    markerCoordinates.push(locations[i].coordinates)
    // console.log(locations[i].coordinates)
}

