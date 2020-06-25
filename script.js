const proxy = "https://cors-anywhere.herokuapp.com/";
var xmlhttp = new XMLHttpRequest();
// var xmlhttp2 = new XMLHttpRequest();
var latitude;
var longitude;
var position;
var map;

xmlhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    var issObj = JSON.parse(this.responseText);
    latitude = issObj.iss_position.latitude;
    longitude = issObj.iss_position.longitude;
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

    var image = "satellite.png"
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: image
    })

    
  }
}

xmlhttp.open("GET", `${proxy}http://api.open-notify.org/iss-now.json`, true);
xmlhttp.send();

// xmlhttp2.onreadystatechange = function() {
//   if(this.readyState == 4 && this.status == 200) {
//     var passTimesObj = JSON.parse(this.responseText);
//     passTimesObj.response.forEach(function(item, index){
//       var date = new Date(item.risetime * 1000);
//       document.getElementById("isspass").innerHTML += date.toString() + "<br>";
//     })
//   }
// };

// xmlhttp2.open("GET", `${proxy}http://api.open-notify.org/iss-pass.json?lat=42.9849&lon=-81.2453`, true);
// xmlhttp2.send();

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