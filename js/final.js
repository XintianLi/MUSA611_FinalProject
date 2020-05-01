
var landUseUniqueList = [];

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

$(document).ready(function() {
  $.ajax(dataset).done(function(data){
    parsedData = JSON.parse(data);
    eachFeatureFunction(parsedData);
    featureGroup = L.geoJson(parsedData,{
      style:myStyle
    }).addTo(map);
    // featureGroup.eachLayer(eachFeatureFunction);
  })
});


var eachFeatureFunction = function(data){
  for(var i = 0; i<data.features.length; i++){
    if(landUseUniqueList.indexOf(data.features[i].properties.PPR_USE) == -1){
      landUseUniqueList.push(data.features[i].properties.PPR_USE);
      console.log(data.features[i].properties.PPR_USE);
    }
  }
}

var isPark = function(landUse){
  if (landUse.indexOf('PARK') != -1){
    console.log("I am a park")
  } else {
    console.log("Not a Park!")
  }
}

var getColor = function(landUse){
  if (landUse.indexOf("PARK") != -1) {
    return "#d73027"
  } else if (landUse=="RECREATION_SITE") {
    return "#f46d43"
  } else if (landUse=="REGIONAL_CONSERVATION_WATERSHED") {
    return "#fdae61"
  } else if (landUse=="YOUTH_TOT_PLAY_AREAS") {
    return "#fee08b"
  } else if (landUse=="POOL") {
    return "#ffffbf"
  } else if (landUse=="ICE_RINK") {
    return "#d9ef8b"
  } else if (landUse=="ENVIRONMENTAL_EDUCATION_CENTER") {
    return "#a6d96a"
  } else if (landUse=="ATHLETIC") {
    return "#66bd63"
  } else if (landUse=="MUSEUM") {
    return "#1a9850"
  } else if (landUse=="OLDER_ADULT_CENTER") {
    return "#0868ac"
  } else if (landUse=="MULTI_USE") {
    return "#a8ddb5"
  } else if (landUse=="GOLF") {
    return "blue"
  } else if (landUse=="FARM") {
    return "#6a51a3"
  } else if (landUse=="ZOO_HABITAT") {
    return "#f16913"
  } else if (landUse=="SQUARE_PLAZA") {
    return "#980043"
  } else if (landUse=="HISTORIC_HOUSE") {
    return "blue"
  } else if (landUse=="BOATHOUSE") {
    return "blue"
  } else if (landUse=="STATUE_MONUMENT_SCULPTURE") {
    return "blue"
  } else if (landUse=="CONCESSIONS_RETAIL_CAFE") {
    return "blue"
  } else if (landUse=="PAVILION_SHELTER") {
    return "blue"
  } else if (landUse=="GREENHOUSE_NURSERY") {
    return "blue"
  }
}

var myStyle = function(feature){
  return{
    fillColor: getColor(feature.properties.PPR_USE),
    fillOpacity: 0.8,
    color:"white",
    weight:1,
    opacity:0.8
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
