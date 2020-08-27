function init() {
  var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  );

  map = new L.Map("map", {
    center: [50.0, 10.0],
    zoom: 5,
    minZoom: 5,
    maxZoom: 10,
    zoomControl: false,
    layers: [Esri_WorldImagery]
  });

  var circle = document.getElementById("circle");

  var initialZoom;

  var initialCenter;

  var clickMode = false;

  var keyDown = false;

  function zoomTo(zoom) {
    circle.style.transform = `scale(${Math.pow(2, zoom - 5)})`;
  }

  map.on("zoomanim", function(e) {
    zoomTo(e.target._animateToZoom);
  });

  map.on("mousedown", function(e) {
    if (clickMode === true) {
      if (!initialZoom && !initialCenter) {
        var latlng = e.latlng;
        var autoZoom = 10;
        initialZoom = map.getZoom();
        initialCenter = map.getCenter();
        zoomTo(autoZoom);
        map.setView(latlng, autoZoom, { animate: false });
        document.body.classList.add("mod");
      }
    }
  });

  L.control
    .zoom({
      position: "topright"
    })
    .addTo(map);

  Mousetrap.bind(
    "s",
    function(e) {
      clickMode = !clickMode;
      console.log("clickmode", clickMode);
      if (clickMode) {
        document.body.classList.add("active");
      } else {
        document.body.classList.remove("active");
        document.body.classList.remove("mod");
        zoomTo(initialZoom);
        initialZoom &&
          initialCenter &&
          map.setView(initialCenter, initialZoom, { animate: false });
        initialCenter = undefined;
        initialZoom = undefined;
      }
    },
    "keyup"
  );
}

window.onload = init;
