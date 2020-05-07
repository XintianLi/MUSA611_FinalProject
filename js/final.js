
var landUseUniqueList = [];
var propertiesUniqueList = [];
var paraValue;


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
var parsedData;

$(document).ready(function() {
  // get the value in the url
  getTextValue();
  console.log("paraValue = "+paraValue);

  $.ajax(dataset).done(function(data){
    parsedData = JSON.parse(data);
    eachFeatureLandUse(parsedData);
    featureGroup = L.geoJson(parsedData,{
      style:myStyle,
      onEachFeature:interactions
    }).addTo(map);
    featureGroup.eachLayer(eachPopUp);
    propertiesUniqueList = Object.keys(parsedData.features[0].properties)
    console.log(parsedData);
    console.log(featureGroup) 
    console.log(propertiesUniqueList)
  })
  // why global variables does not work out of the ajax call?
  // console.log(parsedData);
  // console.log(featureGroup);
});

var eachFeatureLandUse = function(data){
  for(var i = 0; i<data.features.length; i++){
    if(landUseUniqueList.indexOf(data.features[i].properties.PPR_USE) == -1){
      landUseUniqueList.push(data.features[i].properties.PPR_USE);
      // console.log(data.features[i].properties.PPR_USE);
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
    fillOpacity: 0.7,
    color:"white",
    weight:3,
    opacity:0.8
  }
}

// highlight function
var highlightFeature = function(e){
  var layer = e.target;
  layer.setStyle({
    weight:5,
    color:"#f03b20",
    dashArray: '',
    fillOpacity:1
  });

}

var resetHighlight = function(e){
  featureGroup.resetStyle(e.target)
}

var zoomToFeature = function(e){
  map.fitBounds(e.target.getBounds());
}

var interactions = function(feature,layer){
  layer.on({
    mouseover:highlightFeature,
    mouseout: resetHighlight,
    click:zoomToFeature
  })
}

// popup function
var eachPopUp = function(layer){
  layer.bindPopup(`Name:${layer.feature.properties.ASSET_NAME}<br>
  Address:${layer.feature.properties.ADDRESS}<br>
  Zip Code:${layer.feature.properties.ZIPCODE}<br>
  Area: ${layer.feature.properties.SQ_FEET}<br>
  Type:${layer.feature.properties.PPR_USE}`)
}


// get url parameter
function getTextValue() {
  //get url
  var myUrl = location.href;
  // alert(myUrl); 

 //get string after ?
  var parameterStr = myUrl.split("?")[1]; 
 //split the string and get the array
  // var parArray = parameterStr.split("&");

  //for loop get the elements for each  
//  for (var i = 0; i<parArray.length; i++){  
//     var parameter = parArray[i]; 

//      //split the string by =
//       var parName = parameter.split("=")[0]; 
//      //parameter name
//       parName = decodeURI(parName); 

//      var parValue = parameter.split("=")[1];
//       // decode
//       parValue = decodeURI(parValue); 

//      alert(parName+"="+parValue);
//   }

  // paraValue = decodeURI(parameterStr.split("=")[1]);
}

function cleanDiv(divname){
  $(`#${divname}`).html("");
}

function createDiv(landName,divname){
  var html = `<div class="card-continer">
  <div class="card">
    <h2>${landName}</h2>
    <i class="fas fa-arrow-right"></i>
    <p>a lonely trip.</p>
    <div class="pic"></div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <button>
    </button>
  </div>
</div>`
$(`#${divname}`).append(html);
}

$("button").click(function(e){
  console.log(e)
})

var subFeatureGroup = [];

function search(){
  cleanDiv("sidebar");
  var zip,landUse;
  if($("#searchZipcode")){
    zip = $("#searchZipcode").val().toUpperCase();
  }

  if($("#searchLanduse")){
    landUse = $("#searchLanduse").val().toUpperCase();
  }

  subFeatureGroup = [];

  $.ajax({
    url: dataset,
    type: "get",
    dataType: "json",
    async: false,
    success: function(e){
      // add elements
      for(var i = 0; i<e.features.length; i++){
        if(zip == "" && landUse != ""){
          console.log("zip undefined");
          if(e.features[i].properties.PPR_USE.indexOf(landUse) != -1){
            subFeatureGroup.push(e.features[i]);
          }
        }
        if(landUse == "" && zip != ""){
          if(e.features[i].properties.ZIPCODE == zip){
            subFeatureGroup.push(e.features[i]);
          }
        }
        if(landUse == "" && zip == ""){
          subFeatureGroup = [];
          alert("Both Null");
        }
        if(zip != "" && landUse != ""){
          if(e.features[i].properties.ZIPCODE == zip && e.features[i].properties.PPR_USE.indexOf(landUse) != -1){
            subFeatureGroup.push(e.features[i]);
          }
        }
      }

      for(var i = 0; i<subFeatureGroup.length; i++){
        createDiv(subFeatureGroup[i].properties.ASSET_NAME,"sidebar")
      }
    }
});

}
