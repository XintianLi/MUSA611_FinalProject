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
    position:{
        marker:null,
        updated: null
    }
}

var goToOrigin = _.once(function(lat, lng) {
map.flyTo([lat, lng], 14);
});


var updatePosition = function(lat, lng, updated) {
    if (state.position.marker) { map.removeLayer(state.position.marker); }
    state.position.marker = L.marker([lat, lng], {color: "blue"});
    state.position.updated = updated;
    state.position.marker.addTo(map);
    goToOrigin(lat, lng);
};
  
$("#current-location").click(function(e){
    console.log(e);
    $("#starting-point").val("Your Current Location");
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
        });
      } else {
        alert("Unable to access geolocation API!");
      }
})

$("#search-route").keyup(function(e){
    if ($("#starting-point").val().length===0) {
        
    }
})

$("#search-route").click(function(e){


})