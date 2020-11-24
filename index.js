let map;
var host = "http://172.17.0.5"
//alert(window.location.href)
initial()

window.addEventListener('popstate', function(event) {
  initial()
}, false);

function bukalogin(){
  history.pushState("", "login", "login/");
  loadDoc()
}

function initial(){
  if(window.location.pathname == "/" ){
    loadDoc(fungsi=untukMap)
  }
  else if(window.location.pathname == "/login/"){
    loadDoc()
  }
  else{
    loadDoc()
  }
}

function loadDoc(fungsi=null, content = "content.html"){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      fungsi();
    }
    else if(this.readyState != 4){
      document.getElementById("content").innerHTML = "loading"
    }
    else{
      document.getElementById("content").innerHTML = "error";
      fungsi()
    }
  };
  xhttp.open("GET", content, true);
  xhttp.send();
  // fetch("content.html").then(
  //   response=>{
  //     document.getElementById("content").innerHTML = response;
  //     fungsi();
  //   }
  // )
}

function untukMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(-6.924472, 107.773821),
    zoom: 15,
  });
  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
  const icons = {
    parking: {
      icon: iconBase + "parking_lot_maps.png",
    },
    library: {
      icon: iconBase + "library_maps.png",
    },
    info: {
      icon: iconBase + "info-i_maps.png",
    },
  };
  let features = [
    {
      position: new google.maps.LatLng(-6.923831, 107.773831),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-6.927027, 107.773170),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.9191, 151.22907),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91725, 151.23011),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91872, 151.23089),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91784, 151.23094),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91682, 151.23149),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.9179, 151.23463),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91666, 151.23468),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.916988, 151.23364),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-6.924294, 107.773818),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      type: "parking",
    },
    {
      position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      type: "library",
    },
  ];

  // Create markers.
  for (let i = 0; i < features.length; i++) {
    let infowindow = new google.maps.InfoWindow({
      content: '<h1>'+i+'</h1>'
    });
    let marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    })
  }
}

function initMap() {
  loadDoc(fungsi = untukMap)  
}
