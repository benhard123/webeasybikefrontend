let map;
let bikelocation = [];
let bikeinfo = [];
let folderdir="";
let apihost="http://172.17.0.2:8000"

initial();

window.addEventListener('popstate', function(event) {
  initial();
}, false);

function buttonactivechanger(){
  let tombolatas = document.getElementsByClassName("tombolatas");
  if(window.location.pathname == folderdir+"/" ){
    tombolatas[0].classList.remove("active");
    tombolatas[1].classList.remove("active");
    tombolatas[2].classList.remove("active");
    tombolatas[3].classList.remove("active");
    tombolatas[4].className += " active";
  }
  else if(window.location.pathname == folderdir+"/login/"){
    tombolatas[0].className += " active";
    tombolatas[1].classList.remove("active");
    tombolatas[2].classList.remove("active");
    tombolatas[3].classList.remove("active");
    tombolatas[4].classList.remove("active");
  }
  else if(window.location.pathname == folderdir+"/kontak/"){
    tombolatas[0].classList.remove("active");
    tombolatas[1].className += " active";
    tombolatas[2].classList.remove("active");
    tombolatas[3].classList.remove("active");
    tombolatas[4].classList.remove("active");
  }
  else if(window.location.pathname == folderdir+"/fitur/"){
    tombolatas[0].classList.remove("active");
    tombolatas[1].classList.remove("active");
    tombolatas[2].className += " active";
    tombolatas[3].classList.remove("active");
    tombolatas[4].classList.remove("active");
  }
  else if(window.location.pathname == folderdir+"/tentang/"){
    tombolatas[0].classList.remove("active");
    tombolatas[1].classList.remove("active");
    tombolatas[2].classList.remove("active");
    tombolatas[3].className += " active";
    tombolatas[4].classList.remove("active");
  }
}

function bukalogin(){
  if(window.location.pathname != folderdir+"/login/"){
    history.pushState("", "login", folderdir+"/login/");
    buttonactivechanger();
    document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad - Login"
    initial();
  }
}

function bukaberanda(){
  if(window.location.pathname != folderdir+"/"){
    history.pushState("", "beranda", folderdir+"/");
    buttonactivechanger();
    initial();
  }
}

function bukafitur(){
  if(window.location.pathname != folderdir+"/fitur/"){
    history.pushState("", "fitur", folderdir+"/fitur/");
    buttonactivechanger();
    initial();
  }
}

function bukakontak(){
  if(window.location.pathname != folderdir+"/kontak/"){
    history.pushState("", "kontak", folderdir+"/kontak/");
    buttonactivechanger();
    initial();
  }
}

function bukatentang(){
  if(window.location.pathname != folderdir+"/tentang/"){
    history.pushState("", "tentang", folderdir+"/tentang/");
    buttonactivechanger();
    initial();
  }
}

function showMenu(){
  let menubtn = document.getElementsByClassName("menu")[0]
  if(menubtn.style.display == "" || menubtn.style.display == "none"){
    menubtn.style.display = "block"
  }
  else{
    menubtn.style.display = ""
  }
}

function initial(){
  if(window.location.pathname == folderdir+"/" ){
    document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad";
    loadDoc(fungsi=untukMap)
  }
  else if(window.location.pathname == folderdir+"/login/"){
    document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad - Login";
    loadDoc()
  }
  else{
    document.getElementsByTagName("title")[0].innerText = "Easy Bike Unpad";
    loadDoc()
  }
}

function loadDoc(fungsi=null, content = "content.html?dev="+ Math.floor(Math.random() * 100) +""){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = this.responseText;
      fungsi();
      // Check Login
      if(window.location.pathname == folderdir+"/"){
        // alert(document.cookie)
        if(document.cookie.match(/^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/)){
          let tombolgn = document.getElementsByClassName("masuk")[0];
          tombolgn.onclick = function () {
            document.cookie="jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            let tombolgn = document.getElementsByClassName("masuk")[0];
            tombolgn.onclick = bukalogin;
            tombolgn.style.color = "";
            tombolgn.innerHTML = "Login";
            // let acc = document.getElementsByClassName("profil");
	          // for (let i = 0; i < acc.length; i++) {
            //   acc[i].style.display="none";
	          // }
          };
          tombolgn.style.color = "white";
          tombolgn.innerHTML = "Logout";
          // let acc = document.getElementsByClassName("profil");
	        // for (let i = 0; i < acc.length; i++) {
          //   acc[i].style.display="block";
	        // }
        }
      }
      // Selector menu
      buttonactivechanger();
    }
    else if(this.readyState != 4){
      document.getElementById("content").innerHTML = "loading"
    }
    else{
      document.getElementById("content").innerHTML = "error";
    }
    // pagebutton();
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
    { lat: -6.932651, lng: 107.772106 },
    { lat: -6.932191, lng: 107.773204 },
    { lat: -6.932079, lng: 107.773937 },
    { lat: -6.931424, lng: 107.776048 },
    { lat: -6.931418, lng: 107.776363 },
    { lat: -6.931891, lng: 107.776472 },
    { lat: -6.931680, lng: 107.777202 },
    { lat: -6.931374, lng: 107.777674 },
    { lat: -6.930756, lng: 107.778274 },
    { lat: -6.929845, lng: 107.778828 },
    { lat: -6.928698, lng: 107.778869 },
    { lat: -6.927363, lng: 107.778429 },
    { lat: -6.926586, lng: 107.778096 },
    { lat: -6.925641, lng: 107.777132 },
    { lat: -6.924842, lng: 107.776576 },
    { lat: -6.924700, lng: 107.775979 },
    { lat: -6.923277, lng: 107.775454 },
    { lat: -6.922336, lng: 107.774795 },
    { lat: -6.921567, lng: 107.774395 },
    { lat: -6.921150, lng: 107.774845 },
    { lat: -6.920242, lng: 107.774638 },
    { lat: -6.919546, lng: 107.773759 },
    { lat: -6.919406, lng: 107.772430 },
    { lat: -6.919537, lng: 107.771042 },
    { lat: -6.920028, lng: 107.769949 },
    { lat: -6.920234, lng: 107.769602 },
    { lat: -6.921432, lng: 107.769658 },
    { lat: -6.921602, lng: 107.769462 },
    { lat: -6.921665, lng: 107.769304 },
    { lat: -6.921920, lng: 107.769153 },
    { lat: -6.922393, lng: 107.769152 },
    { lat: -6.922599, lng: 107.769260 },
    { lat: -6.930421, lng: 107.772756 },
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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let hasil = JSON.parse(this.responseText)
      console.log(JSON.parse(this.responseText))
      for (let i =0; i<hasil.length; i++){
        bikelocation[i].setPosition(new google.maps.LatLng(hasil[i].latitude,hasil[i].longitude))
        bikelocation[i].addListener("click", () => {
          bikeinfo[i].open(map, bikelocation[i]);
        })
      }
    }
    // else if(this.readyState != 4){
    //   document.getElementById("content").innerHTML = "loading"
    // }
    // else{
    //   document.getElementById("content").innerHTML = "error";
    // }
  };
  xhttp.open("GET", apihost+"/gpsdata", true);
  xhttp.setRequestHeader("Accept", "application/json");
  if(window.location.pathname == folderdir+"/"){
    xhttp.send();
  }
}

function lokasiSepedaInit(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let hasil = JSON.parse(this.responseText)
      console.log(JSON.parse(this.responseText))
      for (let i =0; i<hasil.length; i++){
        let bikeinfok = new google.maps.InfoWindow({
          content: '<h1 class="Judul_peta">'+i+'</h1>',
          // position: new google.maps.LatLng(hasil[i].latitude,hasil[i].longitude)
        });
        bikeinfo.push(bikeinfok);
        bikelocationok = new google.maps.Marker({
          position: new google.maps.LatLng(hasil[i].latitude,hasil[i].longitude),
          icon: folderdir+"/assets/bicycle_icon_135886.png",
          map: map,
        });
        bikelocation.push(bikelocationok);
        bikelocation[i].addListener("click", () => {
          bikeinfo[i].open(map, bikelocation[i]);
        })
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
  xhttp.open("GET", apihost+"/gpsdata", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}

function initMap() {
  loadDoc(fungsi = untukMap)  
}

function loginfunction(){
  var passhash = CryptoJS.MD5(document.getElementById("password1").value).toString();
  alert(document.getElementById("login").value+passhash)
  var xhttp = new XMLHttpRequest();
  // xhttp.responseType = "json"
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // alert(JSON.stringify(JSON.parse(this.responseText)));
      let logindata = JSON.parse(this.responseText);
      alert(logindata.jwt);
      document.cookie = "jwt="+logindata.jwt;
      window.location.pathname = folderdir+"/";
      initial(); 
    }
    else if(this.readyState == 4){
      alert(this.responseText);
    }
  };
  xhttp.open("POST", apihost+"/login", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Accept", "application/json")
  xhttp.send(JSON.stringify({username: document.getElementById("login").value, password: passhash}));
  // alert(document.getElementsByName("username")[0].value + document.getElementsByName("password")[0].value)
}

// function pagebutton(){
//   let acc = document.getElementsByClassName("accordion");
// 	let i;
		
// 	for (i = 0; i < acc.length; i++) {
// 	  acc[i].addEventListener("click", function() {
// 		  this.classList.toggle("active");
// 		  let panel = this.nextElementSibling;
// 		  if (panel.style.height === "") {
//         if (this.classList.contains("tabatas")){
//           panel.style.height = "500px";
//         }
//         else if (this.classList.contains("profil")){
//           panel.style.height = "200px";
//         }
//         else{
//           if(window.matchMedia("(max-width: 500px)").matches){
//             panel.style.height = "300px";
//           }
//           else{
//             panel.style.height = "100px";
//           }
//         }
//       } 
//       else {
// 		    panel.style.height = "";
// 		  }
// 	  });
// 	}
// }

function nampakregister() {      
  formlogin.style.opacity = "0";
  formregister.style.opacity= "100%";
  formlogin.style.height = "0";
  formregister.style.height = "100%";
  formlogin.style.width = "0";
  formregister.style.width = "100%";
  formlogin.style.display = "none";
  formregister.style.display = "block";
}      
  
    
function nampaklogin() {
  formregister.style.opacity = "0";
  formlogin.style.opacity = "100%";
  formregister.style.height = "0";
  formlogin.style.height = "100%"; 
  formlogin.style.width = "100%";
  formregister.style.width = "0";
  formlogin.style.display = "block";
  formregister.style.display = "none";
}      
