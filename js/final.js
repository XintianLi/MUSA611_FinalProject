var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 12
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieGludGlhbiIsImEiOiJjazh1bGtkOXMwY2h4M25wYXh2d3J5NGpzIn0.6f78lOG9zSD3Iicqt6nXqQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieGludGlhbiIsImEiOiJjazh1bGtkOXMwY2h4M25wYXh2d3J5NGpzIn0.6f78lOG9zSD3Iicqt6nXqQ'
}).addTo(map);


// import Recreation Assets data
var dataset="https://gist.githubusercontent.com/XintianLi/01972fc74f62309f7aef678d725d5e8a/raw/eb1c37279f47fb4b073d110469603ff7eff7bcf9/Philly_RecreationAssets.geojson"
var featureGroup;
$.ajax(dataset).done(function(data){
  parsedData = JSON.parse(data);
  featureGroup = L.geoJson(parsedData,{
    style:myStyle
  }).addTo(map);
  featureGroup.eachLayer(isPark)
})

var eachFeatureFunction = function(layer){
  console.log(layer.feature.properties.PPR_USE)
}

var isPark = function(landUse){
  if (landUse.indexOf('PARK')){
    console.log("I am a park")
  } else {
    console.log("Not a Park!")
  }
}


var getColor = function(landUse){
  if (landUse.indexOf("PARK")) {
    return "yellow"
  } else if (landUse=="ATHLETIC") {
    return "blue"
  } else {
    return "green"
  }
}

var myStyle = function(feature){
  return{
    fillColor: getColor(feature.properties.PPR_USE),
    fillOpacity: 0.7,
    color:"white",
    weight:2,
    opacity:1
  }
}




//   switch (layer.feature.properties.PPR_USE) {
//     case "ATHLETIC": return "";
//       break;
//     case "BOATHOUSE": return "";
//       break;
//     case "COMMUNITY_PARK": return "";
//       break;
//     case "CONCESSIONS_RETAIL_CAFE": return "";
//       break;
//     case "ENVIRONMENTAL_EDUCATION_CENTER": return "";
//       break;
//     case "FARM": return "";
//       break;
//     case "GARDEN": return "";
//       break;
//     case "GOLF": return "";
//       break;
//       GREENHOUSE_NURSERY
//   }
// }
