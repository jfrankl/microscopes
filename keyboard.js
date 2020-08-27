(function() {
  var mag = false;

  L.Control.MagnifyingGlass = L.Control.extend({
    _magnifyingGlass: false,

    options: {
      position: "topleft",
      title: "Toggle Magnifying Glass",
      forceSeparateButton: false
    },

    initialize: function(magnifyingGlass, options) {
      this._magnifyingGlass = magnifyingGlass;
      // Override default options
      for (var i in options)
        if (options.hasOwnProperty(i) && this.options.hasOwnProperty(i))
          this.options[i] = options[i];
    },

    onAdd: function(map) {
      var className = "leaflet-control-magnifying-glass",
        container;

      if (map.zoomControl && !this.options.forceSeparateButton) {
        container = map.zoomControl._container;
      } else {
        container = L.DomUtil.create("div", "leaflet-bar");
      }

      this._addListeners(map, this._magnifyingGlass);

      return container;
    },

    _addListeners: function(map, magnifyingGlass) {
      document.addEventListener("keydown", function(e) {
        if (e.keyCode === 83) {
          if (!magnifyingGlass) {
            return;
          }

          if (map.hasLayer(magnifyingGlass)) {
          } else {
            magnifyingGlass.addTo(map);
            document.body.classList.add("mod");
            console.log("added");
          }
        }
      });

      document.addEventListener("keyup", function(e) {
        if (e.keyCode === 83) {
          if (!magnifyingGlass) {
            return;
          }
          document.body.classList.remove("mod");
          map.removeLayer(magnifyingGlass);
        }
      });
    },

    _createButton: function(
      title,
      className,
      container,
      method,
      map,
      magnifyingGlass
    ) {
      var link = L.DomUtil.create("a", className, container);
      link.href = "#";
      link.title = title;

      L.DomEvent.addListener(link, "click", L.DomEvent.stopPropagation)
        .addListener(link, "click", L.DomEvent.preventDefault)
        .addListener(
          link,
          "click",
          function() {
            method(map, magnifyingGlass);
          },
          map
        );

      return link;
    },

    _clicked: function(map, magnifyingGlass) {
      if (!magnifyingGlass) {
        return;
      }

      if (map.hasLayer(magnifyingGlass)) {
        map.removeLayer(magnifyingGlass);
      } else {
        magnifyingGlass.addTo(map);
      }
    }
  });

  L.control.magnifyingglass = function(magnifyingGlass, options) {
    return new L.Control.MagnifyingGlass(magnifyingGlass, options);
  };
})();

function init() {
  var tileUrl =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  var tileOptions = {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  };

  var map = new L.Map("map", {
    center: [50.0, 10.0],
    zoom: 5,
    minZoom: 5,
    maxZoom: 10,
    layers: [L.tileLayer(tileUrl, tileOptions)]
  });

  var magnifyingGlass = L.magnifyingGlass({
    radius: 150,
    fixedZoom: 10,
    layers: [L.tileLayer(tileUrl, tileOptions)]
  });

  L.control
    .magnifyingglass(magnifyingGlass, {
      forceSeparateButton: true
    })
    .addTo(map);
}

window.onload = init;
