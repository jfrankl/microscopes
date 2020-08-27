function init() {
  var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  );

  window.map = new L.Map("map", {
    center: [50.0, 10.0],
    zoom: 5,
    minZoom: 5,
    maxZoom: 10,
    layers: [Esri_WorldImagery]
  });

  var circle = document.getElementById("circle");

  var initialZoom;

  var initialCenter;

  var keyDown = false;

  function zoomTo(zoom) {
    circle.style.transform = `scale(${Math.pow(2, zoom - 5)})`;
  }

  map.on("zoomanim", function(e) {
    zoomTo(e.target._animateToZoom);
  });

  map.on("click", function(e) {
    if (keyDown === true) {
      var latlng = e.latlng;
      initialZoom = map.getZoom();
      initialCenter = map.getCenter();
      document.body.classList.add("mod");
      var autoZoom = 10;
      zoomTo(autoZoom);
      console.log(latlng);
      map.setView(latlng, autoZoom);
    }
  });

  document.addEventListener("keydown", function(e) {
    document.body.classList.add("active");
    if (e.keyCode === 83) {
      if (!keyDown) {
        keyDown = true;
      }
    }
  });

  document.addEventListener("keyup", function(e) {
    document.body.classList.remove("active");
    if (e.keyCode === 83) {
      keyDown = false;
      zoomTo(initialZoom);
      document.body.classList.remove("mod");
      initialZoom && initialCenter && map.setView(initialCenter, initialZoom);
      initialCenter = undefined;
      initialZoom = undefined;
    }
  });
}

window.onload = init;
