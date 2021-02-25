let map;
let bikelocation = [];

initial()

window.addEventListener('popstate', function(event) {
  initial()
}, false);

function bukalogin(){
  document.getElementsByClassName("latarmap")[0].classList.toggle("fadeOutUp");
  setTimeout(()=>{
    if(window.location.pathname == "/" ){
      history.pushState("", "login", "login/");
      document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad - Login"
      loadDoc()
    }
  },1000)
  // if(window.location.pathname == "/" ){
  //   history.pushState("", "login", "login/");
  //   document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad - Login"
  //   loadDoc()
  // }
}

function initial(){
  if(window.location.pathname == "/" ){
    document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad"
    loadDoc(fungsi=untukMap)
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
      if(window.location.pathname == "/"){
        // alert(document.cookie)
        if(document.cookie.match(/^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/)){
          let tombolgn = document.getElementsByClassName("tombollogin")[0];
          tombolgn.onclick = function () {
            document.cookie="jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            let tombolgn = document.getElementsByClassName("tombollogin")[0];
            tombolgn.style.color = "";
            tombolgn.innerHTML = "Login";
            let acc = document.getElementsByClassName("profil");
	          for (let i = 0; i < acc.length; i++) {
              acc[i].style.display="none";
	          }
          };
          tombolgn.style.color = "white";
          tombolgn.innerHTML = "Logout";
          let acc = document.getElementsByClassName("profil");
	        for (let i = 0; i < acc.length; i++) {
            acc[i].style.display="block";
	        }
        }
      }
    }
    else if(this.readyState != 4){
      document.getElementById("content").innerHTML = "loading"
    }
    else{
      document.getElementById("content").innerHTML = "error";
    }
    pagebutton();
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

  // const koordinatgeofence = [
  //   { lat: -6.930246, lng: 107.774365 },
  //   { lat: -6.928944, lng: 107.777785 },
  //   { lat: -6.919930, lng: 107.774055 },
  //   { lat: -6.921711, lng: 107.769723 },
  //   { lat: -6.930246, lng: 107.774365  },
  // ];
  const koordinatgeofence = [
    { lat: -6.932651, lng: 107.772106 },
    { lat: -6.932191, lng: 107.773204 },
    { lat: -6.932079, lng: 107.773937 },
    { lat: -6.931424, lng: 107.776048 },
    { lat: -6.931418, lng: 107.776363 },
    { lat: -6.931891, lng: 107.776472 },
    { lat: -6.919930, lng: 107.774055 },
    { lat: -6.921711, lng: 107.769723 },
    { lat: -6.930406, lng: 107.773581 },
    { lat: -6.930960, lng: 107.771675 },
    { lat: -6.932651, lng: 107.772106 },
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
  lokasiSepedaInit();
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
      setInterval(lokasiSepeda,2000)
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
  var passhash = CryptoJS.MD5(document.getElementById("password1").value).toString();
  var xhttp = new XMLHttpRequest();
  // xhttp.responseType = "json"
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // alert(JSON.stringify(JSON.parse(this.responseText)));
      let logindata = JSON.parse(this.responseText);
      alert(logindata.jwt);
      document.cookie = "jwt="+logindata.jwt;
      window.location.pathname = "/";
      initial(); 
    }
    else if(this.readyState == 4){
      alert(this.responseText);
    }
  };
  xhttp.open("POST", "http://172.17.0.2:8000/login", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Accept", "application/json")
  xhttp.send(JSON.stringify({username: document.getElementById("login").value, password: passhash}));
  // alert(document.getElementsByName("username")[0].value + document.getElementsByName("password")[0].value)
}

function pagebutton(){
  let acc = document.getElementsByClassName("accordion");
	let i;
		
	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
		  this.classList.toggle("active");
		  let panel = this.nextElementSibling;
		  if (panel.style.height === "") {
        if (this.classList.contains("tabatas")){
          panel.style.height = "500px";
         }
        else{
          if(window.matchMedia("(max-width: 500px)").matches){
            panel.style.height = "300px";
          }
          else{
            panel.style.height = "100px";
          }
        }
      } 
      else {
		    panel.style.height = "";
		  }
	  });
	}
}

function nampakregister() {
  //Change css properties
  loginBtn.classList.remove("active");
  registerBtn.classList.add("active");  
  formlogin.style.opacity = "0";
  formregister.style.opacity = "100%";
  formlogin.style.height = "0";	
  formregister.style.height = "100%";
  formContent.style.marginLeft = "-44%";
  judul.style.marginLeft = "43%" ;
  formFooter.style.height= "0" ;
  formFooter.style.opacity= "0" ;
  formFooter.style.display = "none" ;
}      
//Registration button is clicked

function nampaklogin() {
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
  formregister.style.opacity = "0";
  formlogin.style.opacity = "100%";
  formregister.style.height = "0";
  formlogin.style.height = "100%"; 
  formContent.style.marginLeft = "30%";
  judul.style.marginLeft = "3%" ;
  formFooter.style.height= "100%" ;
  formFooter.style.opacity= "100%" ;
  formFooter.style.display = "block" ;
}
