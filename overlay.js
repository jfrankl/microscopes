function init() {
  var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  );

  var map = new L.Map("map", {
    center: [50.0, 10.0],
    zoom: 5,
    minZoom: 5,
    maxZoom: 10,
    layers: [Esri_WorldImagery]
  });

  var circle = document.getElementById("circle");

  map.on("zoomanim", function(e) {
    circle.style.transform = `scale(${Math.pow(
      2,
      e.target._animateToZoom - 5
    )})`;
  });
}

window.onload = init;
