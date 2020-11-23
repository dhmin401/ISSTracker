const proxy = "https://cors-anywhere.herokuapp.com/";
var latitude;
var longitude;
var position;
var map;
var marker;
var infowindow;
var geocoder;

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
  map = new google.maps.Map(document.getElementById("map"), {
    center: position,
    zoom: 2
  });

  var image = "satellite.png"
  marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: image
  })
  infowindow = new google.maps.InfoWindow({
    Content:
    'Latitude: ' + position.lat + '<br>Longitude: ' + position.lng
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });  

  geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder);
  });
}

var countDownDate = new Date("Nov 29, 1998 2:21:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24)) * -1;
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) * -1;
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) * -1;
  var seconds = Math.floor((distance % (1000 * 60)) / 1000) * -1;

  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
 }, 1000);

function geocodeAddress(geocoder) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {   
      document.getElementById('isspass').innerHTML = `<h4>Five upcoming ISS passes in ${address}</h4>`;
      fetch(`${proxy}http://api.open-notify.org/iss-pass.json?lat=${results[0].geometry.location.lat()}&lon=${results[0].geometry.location.lng()}`,
      { method: 'GET' }
      )
      .then(response => response.json())
      .then(data => {
        data.response.forEach(element => {
          document.getElementById('isspass').innerHTML += new Date(element.risetime * 1000) + '<br>';
        });
      })
      .catch(err => console.warn(err.message));

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
