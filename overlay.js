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

  var mode = false;

  var keyDown = false;

  function zoomTo(zoom) {
    circle.style.transform = `scale(${Math.pow(2, zoom - 5)})`;
  }

  map.on("zoomanim", function(e) {
    zoomTo(e.target._animateToZoom);
  });

  map.on("mousedown", function(e) {
    if (keyDown === true) {
      if (!initialZoom && !initialCenter) {
        var latlng = e.latlng;
        var autoZoom = 10;
        initialZoom = map.getZoom();
        initialCenter = map.getCenter();
        zoomTo(autoZoom);
        map.setView(latlng, autoZoom);
        document.body.classList.add("mod");
      }
    }
  });

  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 83) {
      document.body.classList.add("active");
      if (!keyDown) {
        keyDown = true;
      }
    }
  });

  document.addEventListener("keyup", function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 83) {
      document.body.classList.remove("active");
      document.body.classList.remove("mod");
      keyDown = false;
      zoomTo(initialZoom);
      initialZoom && initialCenter && map.setView(initialCenter, initialZoom);
      initialCenter = undefined;
      initialZoom = undefined;
    } else if (e.keyCode === 65) {
      console.log(mode, "hi");
      mode = !mode;
      if (mode) {
        document.body.classList.add("mod");
      } else {
        document.body.classList.remove("mod");
      }
    }
  });
}

window.onload = init;
