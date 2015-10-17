$( document ).ready(function() {

    var mapProp = {
        center:new google.maps.LatLng(19.555452, -96.928813),
        zoom:14,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("bus"),mapProp);

    $("#localizacion").on("tap",function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(GoogleMap, showError);
        }
        else {
            alert("Your browser does not support Geolocation.");
        }

    });

    function GoogleMap(position) {
    var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var map = new google.maps.Map(document.getElementById('bus'), {
                    zoom: 15,
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                });
    var marker = new google.maps.Marker({
                    map: map,
                    position: location,
                    animation: google.maps.Animation.DROP,
                    title: "This is your location"
                });
    map.setCenter(location);
    }

    function showError() {
        alert("Location can't be found");
    }
});
