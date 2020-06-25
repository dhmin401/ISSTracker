const proxy = "https://cors-anywhere.herokuapp.com/";
var latitude;
var longitude;
var position;
var map;
var marker;
var infowindow;


function moveISS() {
  fetch(`${proxy}http://api.open-notify.org/iss-now.json`,
  { method: 'GET' }
  )
  .then(response => response.json())
  .then(data => {
    latitude = data.iss_position.latitude;
      longitude = data.iss_position.longitude;
      position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      movemarker();
  })
  .catch(err => console.warn(err.message));

  setTimeout(moveISS, 10000);
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: null,
    zoom: 2
  });

  var image = "satellite.png"
  marker = new google.maps.Marker({
    position: null,
    map: map,
    icon: image
  })
  infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });  
  moveISS();
}

function movemarker() {
  var latlng = new google.maps.LatLng(latitude, longitude);
  map.panTo(latlng);
  marker.setPosition(latlng);
  infowindow.setContent('Latitude: ' + position.lat + '<br>Longitude: ' + position.lng);
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


