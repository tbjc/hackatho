$( document ).ready(function() {
var marcadores = [];
var info = false;
var map;
var map2;


    $("#toTaxi").on("tap",function(){
        var mapProp = {
            center:new google.maps.LatLng(19.555452, -96.928813),
            zoom:14,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        map2=new google.maps.Map(document.getElementById("taxi"),mapProp);
         var triangleCoords = [
            {lat: 19.543484, lng: -96.935962},
            {lat: 19.551977, lng: -96.921886},
            {lat: 19.544374, lng: -96.912316},
            {lat: 19.534384, lng: -96.912230},
            {lat: 19.527549, lng: -96.920727},
            {lat: 19.534465, lng: -96.933216},
            {lat: 19.543484, lng: -96.935962},
            ];
        var bermudaTriangle = new google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: '#FF00ff',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF00ff',
            fillOpacity: 0.1
        });
        var triangleCoords2 = [
            {lat: 19.543484, lng: -96.945962},
            {lat: 19.561977, lng: -96.921886},
            {lat: 19.544374, lng: -96.902316},
            {lat: 19.534384, lng: -96.902230},
            {lat: 19.517549, lng: -96.920727},
            {lat: 19.534465, lng: -96.943216},
            {lat: 19.543484, lng: -96.945962},
            ];
        var bermudaTriangle2 = new google.maps.Polygon({
            paths: triangleCoords2,
            strokeColor: '#00ff00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0.1
        });
        var triangleCoords3 = [
            {lat: 19.543484, lng: -96.955962},
            {lat: 19.571977, lng: -96.921886},
            {lat: 19.544374, lng: -96.892316},
            {lat: 19.534384, lng: -96.892230},
            {lat: 19.507549, lng: -96.920727},
            {lat: 19.534465, lng: -96.953216},
            {lat: 19.543484, lng: -96.955962},
            ];
        var bermudaTriangle3 = new google.maps.Polygon({
            paths: triangleCoords3,
            strokeColor: '#00ffff',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0.1
        });

        bermudaTriangle3.setMap(map2);
        bermudaTriangle.setMap(map2);
        bermudaTriangle2.setMap(map2);


    });

    $("#localizacion, #localizacion2").on("click",function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(GoogleMap, showError,{maximumAge: 75000,timeout: 15000 });
        }
        else {
            alert("Your browser does not support Geolocation.");
        }

    });
    $("#borraMarkBus").on("click",function(){
        borrarMakers();
        console.log("borrar");
    });

    $("#buscaBus").on("click",function(){
        cargaRuta("rutas/ruta1.json");
    });

    $("#toBus").on("tap",function(){
        var mapProp = {
            center:new google.maps.LatLng(19.555452, -96.928813),
            zoom:14,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        map=new google.maps.Map(document.getElementById("bus"),mapProp);
    });

    function GoogleMap(position) {
        var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var map = new google.maps.Map(document.getElementById("bus"), {
            zoom: 15,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
        var marker = new google.maps.Marker({
            map: map,
            position: location,
            animation: google.maps.Animation.DROP,
            title: "Tu estas aqui"
        });
        map.setCenter(location);
    }

    function showError() {
        alert("la localizacion no se ha completado");
    }

    function borrarMakers(){
        var i;
        for(i=0;i<marcadores.length;i++){
            marcadores[i].setMap(null);
        }
    }
    function cargaRuta(archivo){

        $.getJSON(archivo, function(rutas){
            console.log(rutas.rutas);
           $.each(rutas.rutas,function(i,r){
               var icono = new google.maps.MarkerImage(
                    "icono.png",
                   new google.maps.Size(30,40)
               );
                marcadores[i] = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(r.longitud), parseFloat(r.latitud)),
                    map: map,
                    icon: icono
                });
               marcadores[i].infoWindow = new google.maps.InfoWindow({
                    content:"<div><h5>"+r.titulo+"</h5><img src='img/"+r.imagen+"' class='imgModal'></div>"
               });

               google.maps.event.addListener(marcadores[i],'click',function (){
                    if(info)
                        info.close();
                   info = this.infoWindow;
                   info.open(map,this);
                   console.log("entro");
               });

               console.log(""+r.latitud+":");
           });
        });
    }
});
