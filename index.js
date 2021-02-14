let map;
let bikelocation = [];

initial()
// setInterval(lokasiSepeda,2000)

window.addEventListener('popstate', function(event) {
  initial()
}, false);

function bukalogin(){
  if(window.location.pathname == "/" ){
    history.pushState("", "login", "login/");
    document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad - Login"
    loadDoc()
  }
}

function initial(){
  if(window.location.pathname == "/" ){
    document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad"
    loadDoc(fungsi=untukMap)
    lokasiSepedaInit();
  }
  else if(window.location.pathname == "/login/"){
    document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad - Login"
    loadDoc()
  }
  else{
    loadDoc()
  }
}

function loadDoc(fungsi=null, content = "content.html?dev="+ Math.floor(Math.random() * 100) +""){
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
    }
    var acc = document.getElementsByClassName("accordion");
		var i;
		
		for (i = 0; i < acc.length; i++) {
		  acc[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.display === "block") {
			  panel.style.display = "none";
			} else {
			  panel.style.display = "block";
			}
		  });
		}
  };
  xhttp.open("GET", content, true);
  xhttp.send();
  // fetch("content.html").then(
  //   response=>{
  //     let data=""
  //     for(i=0; i< response.length; i++){
  //       data+=response[i]
  //     }
  //     document.getElementById("content").innerHTML = data;
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
      content: '<h1 class="Judul_peta">'+i+'</h1>'
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

  const koordinatgeofence = [
    { lat: -6.930246, lng: 107.774365 },
    { lat: -6.928944, lng: 107.777785 },
    { lat: -6.919930, lng: 107.774055 },
    { lat: -6.921711, lng: 107.769723 },
    { lat: -6.930246, lng: 107.774365  },
  ];
  const geofence = new google.maps.Polygon({
    paths: koordinatgeofence,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
  geofence.setMap(map);
}

function lokasiSepeda(){
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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let hasil = JSON.parse(this.responseText)
      console.log(JSON.parse(this.responseText))
      for (let i =0; i<hasil.length; i++){
        bikelocation[i].setPosition(new google.maps.LatLng(hasil[i].latitude,hasil[i].longitude))
      }
    }
    // else if(this.readyState != 4){
    //   document.getElementById("content").innerHTML = "loading"
    // }
    // else{
    //   document.getElementById("content").innerHTML = "error";
    // }
  };
  xhttp.open("GET", "http://172.17.0.2:8000/gpsdata", true);
  xhttp.setRequestHeader("Accept", "application/json");
  if(window.location.pathname == "/"){
    xhttp.send();
  }
}

function lokasiSepedaInit(){
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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let hasil = JSON.parse(this.responseText)
      console.log(JSON.parse(this.responseText))
      for (let i =0; i<hasil.length; i++){
        bikelocationok = new google.maps.Marker({
          position: new google.maps.LatLng(hasil[i].latitude,hasil[i].longitude),
          icon: icons["library"].icon,
          map: map,
        });
        bikelocation.push(bikelocationok);
      }
    }
    // else if(this.readyState != 4){
    //   document.getElementById("content").innerHTML = "loading"
    // }
    // else{
    //   document.getElementById("content").innerHTML = "error";
    // }
  };
  xhttp.open("GET", "http://172.17.0.2:8000/gpsdata", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}

function initMap() {
  loadDoc(fungsi = untukMap)  
}

function loginfunction(){
  var xhttp = new XMLHttpRequest();
  // xhttp.responseType = "json"
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(JSON.stringify(JSON.parse(this.responseText)));
    }
    else if(this.readyState == 4){
      alert(this.responseText);
    }
  };
  xhttp.open("POST", "http://172.17.0.2:8000/login", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Accept", "application/json")
  xhttp.send(JSON.stringify({username: document.getElementsByName("username")[0].value, password: document.getElementsByName("password")[0].value}));
  // alert(document.getElementsByName("username")[0].value + document.getElementsByName("password")[0].value)
}
