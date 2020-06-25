const proxy = "https://cors-anywhere.herokuapp.com/";
var latitude;
var longitude;
var position;
var map;
const key="AIzaSyDZcUlXph8m33WBt6rmYSG956diljrjZDA"

fetch(`${proxy}http://api.open-notify.org/iss-now.json`,
{ method: 'GET' }
)
.then(response => response.json())
.then(data => {
  latitude = data.iss_position.latitude;
    longitude = data.iss_position.longitude;
    position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    initMap();
})
.catch(err => console.warn(err.message));

function initMap() {
  if(latitude !== null && longitude !== null) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: position,
      zoom: 2
    });

    var image = "satellite.png"
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: image
    })

    var infowindow = new google.maps.InfoWindow({
      content: 'Latitude: ' + position.lat +
    '<br>Longitude: ' + position.lng
    });
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
    
  }
}

  var countDownDate = new Date("Nov 2, 2020 4:23:00").getTime();
  var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);


