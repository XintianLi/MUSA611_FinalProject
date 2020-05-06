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


var state = {
    startingPosition:{
        marker:null,
        updated: null,
        latlnglist:null
    },
    destPosition:{
        marker:null,
        updated:null,
        latlnglist:null
    }
}

var goToOrigin = _.once(function(lat, lng) {
map.flyTo([lat, lng], 14);
});


var updatePosition = function(lat, lng, updated) {
    if (state.startingPosition.marker) { map.removeLayer(state.startingPosition.marker); }
    state.startingPosition.marker = L.marker([lat, lng], {color: "blue"});
    state.startingPosition.updated = updated;
    state.startingPosition.latlnglist=[lat,lng];
    state.startingPosition.marker.addTo(map);
    goToOrigin(lat, lng);
};
  
$("#current-location").click(function(e){
    // console.log(e);    
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
        });
        $("#starting-point").val("Your Current Location");
      } else {
        alert("Unable to access geolocation API!");
      }
})


$('#starting-point').keyup(function(e) {
    if ($('#starting-point').val().length != 0 && $('#dest').val().length != 0) {
        $('#search-route').attr('disabled', false);
    } else {
        $('#search-route').attr('disabled', true);
    }
  });

$('#dest').keyup(function(e) {
    if ($('#starting-point').val().length != 0 && $('#dest').val().length != 0) {
        $('#search-route').attr('disabled', false);
    } else {
        $('#search-route').attr('disabled', true);
    }
});


var placeCoords=[];

var findStartCoords = function(placeName){
    var coords = `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=pk.eyJ1IjoibnppbW1lcm1hbiIsImEiOiJjanR1NTBjeWMwZTBlM3lsbXU2d3BtYThzIn0.R0mxkEoHLh-xKk7oG0Tqxg`
    $.ajax(coords).done(function(e){
        var dat= e;
        var placeCoord=[dat.features[0].center[0],dat.features[0].center[1]];
        placeCoords.push(placeCoord);
        console.log(placeCoord);
        return placeCoord;
    })
}

var findDestCoords = function(dest){
    var coords = `https://api.mapbox.com/geocoding/v5/mapbox.places/${dest}.json?access_token=pk.eyJ1IjoibnppbW1lcm1hbiIsImEiOiJjanR1NTBjeWMwZTBlM3lsbXU2d3BtYThzIn0.R0mxkEoHLh-xKk7oG0Tqxg`
    $.ajax(coords).done(function(e){
        var dat= e;
        var placeCoord=[dat.features[0].center[0],dat.features[0].center[1]];
        placeCoords.push(placeCoord);
        console.log(placeCoord)
        return placeCoord;
    })
} 

var findRoute = function(O,D){
    
    DCoodrs = findDestCoords(D);

    if(O == "Your Current Location"){
        OCoords = state.startingPosition.latlnglist;
    }else{
        OCoords = findStartCoords(O);
    }

    route_lat_long = `${OCoords[1]},${OCoords[0]};${DCoodrs[0]},${DCoodrs[1]}`;

    var route =`https://api.mapbox.com/directions/v5/mapbox/walking/${route_lat_long}?access_token=pk.eyJ1IjoibnppbW1lcm1hbiIsImEiOiJjanR1NTBjeWMwZTBlM3lsbXU2d3BtYThzIn0.R0mxkEoHLh-xKk7oG0Tqxg`;
    $.ajax(route).done(function(e){
        var geometry = e.routes[0].geometry;
        var polyline = require('@mapbox/polyline');
        var linestring=polyline.toGeoJSON(geometry);
        L.geoJSON(linestring).addTo(map);
    })

}

$("#clear").click(function(e){
    if (state.startingPosition.marker) {
        map.removeLayer(state.startingPosition.marker);
        state.startingPosition.marker=null;
        state.startingPosition.latlnglist=null;
        state.startingPosition.updated=null;
        $("#starting-point").val(null);
    }   
    if (state.destPosition.marker) {
        map.removeLayer(state.destPosition.marker);
        state.destPosition.marker=null
        state.destPosition.latlnglist=null;
        state.destPosition.updated=null;
    }    
    console.log(state);
})

$("#search-route").click(function(e){
    var dest = $("#dest").val();
    var start = $("#starting-point").val();
    findRoute(start,dest);
    // if (state.startingPosition.marker){
    //     var dest = $("#dest").val();
    //     findDestCoords(dest);
    //     route_lat_lng =`${state.startingPosition.marker._latlng.lng},${state.startingPosition.marker._latlng.lat};${placeCoords[0]},${placeCoords[1]}`;
    //     console.log( route_lat_lng)
    //     console.log(placeCoords )
    //     // findRoute(route_lat_lng)
    //     // var destination = L.marker([placeCoords[1],placeCoords[0]])
    //     // destination.addTo(map)
    // }

})