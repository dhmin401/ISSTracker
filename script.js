const proxy = "https://cors-anywhere.herokuapp.com/";
var xmlhttp = new XMLHttpRequest();
var latitude;
var longitude;

xmlhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    var scheduleObj = JSON.parse(this.responseText);
    latitude = scheduleObj.iss_position.latitude;
    longitude = scheduleObj.iss_position.longitude;

    var map;
    var position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    function initMap() {
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
};

xmlhttp.open("GET", `${proxy}http://api.open-notify.org/iss-now.json`, true);
xmlhttp.send();