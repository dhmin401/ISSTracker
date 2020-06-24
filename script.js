const proxy = "https://cors-anywhere.herokuapp.com/";
var xmlhttp = new XMLHttpRequest();
var latitude;
var longitude;
var position;
var map;

xmlhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    var scheduleObj = JSON.parse(this.responseText);
    latitude = scheduleObj.iss_position.latitude;
    longitude = scheduleObj.iss_position.longitude;
    position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    initMap(); 
  }
};

function initMap() {
  if(latitude !== null && longitude !== null) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: position,
      zoom: 2,
      mapTypeId: 'satellite'
    });
    var marker = new google.maps.Marker({
      position: position,
      map: map
    })
  }
}

xmlhttp.open("GET", `${proxy}http://api.open-notify.org/iss-now.json`, true);
xmlhttp.send();