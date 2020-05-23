var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  maxZoom: 16,
  minZoom: 12,
});

// center map on Iowa coordinates and set initial zoom
var map = L.map('map', {
  maxBounds: L.latLngBounds([41.94276, -91.56811], [41.54276, -91.96811]), // cannot pan past these coordinates
  layers: Esri_WorldImagery,
}).setView([41.742764, -91.768114], 12);

// add a scale bar
L.control.scale({
  position: 'bottomleft'
}).addTo(map);

// Add a function to style the polygons by ownership type
function getColorType(d) {
  return d === "Absentee" ? 'red' :
    d === "Resident" ? 'blue' :
    d === "Corporation" ? 'yellow' :
    'rgba(0,0,0,0.0)';
};

// Add a function to style the polygons by family origins
function getColorOrigin(d) {
  return d === "Austria-Hungary-Czech" ? '#e3e600' :
    d === "Eastern U.S." ? '#0e4bef' :
    d === "Germany" ? '#8954c0' :
    d === "Iowa" ? 'orange' :
    d === "Ireland" ? '#58bb8e' :
    d === "Midwest U.S." ? '#00a6d6' :
    d === "UK" ? '#cd89ab' :
    d === "Other" ? 'gray' :
    'rgba(0,0,0,0.0)'; // supported by Microsoft Edge?
  //'#1C00ff00';
};

// Add a function to style the polygons by ownership percentile
function getColorWealth(d) {
  return d === "Top 10%" ? '#2c7fb8' :
    d === "Middle 40%" ? '#7fcdbb' :
    d === "Bottom 50%" ? '#edf8b1' :
    'rgba(0,0,0,0.0)';
};

// load the data asynchronously
d3.queue()
  .defer(d3.json, 'data/Oxford_1859.geojson')
  .defer(d3.json, 'data/Oxford_1870.geojson')
  .defer(d3.json, 'data/Oxford_1889.geojson')
  .defer(d3.json, 'data/Oxford_1900.geojson')
  .defer(d3.json, 'data/Oxford_1917.geojson')
  .defer(d3.json, 'data/Oxford_1934.geojson')
  .defer(d3.json, 'data/Oxford_1939.geojson')
  .defer(d3.json, 'data/Oxford_1948.geojson')
  .defer(d3.json, 'data/Oxford_1953.geojson')
  .await(drawMap);

// define drawMap function
function drawMap(err, oxford1859, oxford1870, oxford1889, oxford1900, oxford1917, oxford1934, oxford1939, oxford1948, oxford1953) {

  var oxfordLots1859 = L.geoJson(oxford1859, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1859.resetStyle(e.target);
      });

    }

  }).addTo(map); // add the layer to the map

  var oxfordTypes1859 = L.geoJson(oxford1859, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1859.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1859 = L.geoJson(oxford1859, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1859.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1859 = L.geoJson(oxford1859, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1859.resetStyle(e.target);
      });

    }

  });

  var oxfordLots1870 = L.geoJson(oxford1870, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1870.resetStyle(e.target);
      });

    }

  });

  var oxfordTypes1870 = L.geoJson(oxford1870, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1870.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1870 = L.geoJson(oxford1870, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1870.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1870 = L.geoJson(oxford1870, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1870.resetStyle(e.target);
      });

    }

  });

  var oxfordLots1889 = L.geoJson(oxford1889, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1889.resetStyle(e.target);
      });

    }

  });

  var oxfordTypes1889 = L.geoJson(oxford1889, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1889.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1889 = L.geoJson(oxford1889, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1889.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1889 = L.geoJson(oxford1889, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1889.resetStyle(e.target);
      });

    }

  });

  var oxfordLots1900 = L.geoJson(oxford1900, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1900.resetStyle(e.target);
      });

    }

  });

  var oxfordTypes1900 = L.geoJson(oxford1900, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1900.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1900 = L.geoJson(oxford1900, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1900.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1900 = L.geoJson(oxford1900, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1900.resetStyle(e.target);
      });

    }

  });

  var oxfordLots1917 = L.geoJson(oxford1917, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1917.resetStyle(e.target);
      });

    }

  });

  var oxfordTypes1917 = L.geoJson(oxford1917, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1917.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1917 = L.geoJson(oxford1917, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1917.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1917 = L.geoJson(oxford1917, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1917.resetStyle(e.target);
      });

    }

  });

  var oxfordLots1934 = L.geoJson(oxford1934, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1934.resetStyle(e.target);
      });

    }

  });

  var oxfordTypes1934 = L.geoJson(oxford1934, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1934.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1934 = L.geoJson(oxford1934, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1934.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1934 = L.geoJson(oxford1934, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1934.resetStyle(e.target);
      });

    }

  });

  var oxfordLots1939 = L.geoJson(oxford1939, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1939.resetStyle(e.target);
      });

    }

  });

  var oxfordTypes1939 = L.geoJson(oxford1939, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1939.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1939 = L.geoJson(oxford1939, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1939.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1939 = L.geoJson(oxford1939, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1939.resetStyle(e.target);
      });

    }

  });

  var oxfordLots1948 = L.geoJson(oxford1948, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1948.resetStyle(e.target);
      });

    }

  });

  var oxfordTypes1948 = L.geoJson(oxford1948, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1948.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1948 = L.geoJson(oxford1948, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1948.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1948 = L.geoJson(oxford1948, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1948.resetStyle(e.target);
      });

    }

  });

  var oxfordLots1953 = L.geoJson(oxford1953, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: '#cd89ab',
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordLots1953.resetStyle(e.target);
      });

    }

  });

  var oxfordTypes1953 = L.geoJson(oxford1953, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorType(feature.properties.owntype),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordTypes1953.resetStyle(e.target);
      });

    }

  });

  var oxfordOrigins1953 = L.geoJson(oxford1953, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorOrigin(feature.properties.fam_origin),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordOrigins1953.resetStyle(e.target);
      });

    }

  });

  var oxfordWealth1953 = L.geoJson(oxford1953, {

    // style the layer
    style: function(feature) {

      //var tags = [];
      //tags.push('Owner: ' + feature.properties.surname);

      return {
        stroke: 1,
        color: 'white',
        strokeOpacity: 1,
        weight: 1,
        fillColor: getColorWealth(feature.properties.wealth_percentile),
        fillOpacity: 0.5,
        //tags: tags //define the tags with the tags array
      };
    },

    onEachFeature: function(feature, layer) {

      var firstname = feature.properties.firstname;

      var name = firstname + " ";

      if (firstname == null) {
        var name = "";
      }

      // bind a popup window
      layer.bindPopup('<h3>' + name + feature.properties.surname + ', ' + feature.properties.year + '</h3><br><h4>Ownership Type: ' + feature.properties.owntype + '<br>Family Origin: ' + feature.properties.fam_origin + '<br>' + feature.properties.wealth_percentile + ' of landowners by acreage' + '<br>Acres: ' + feature.properties.acres + '</h4>');
      // change layer style on mouseover
      layer.on("mouseover", function(e) {
        layer.setStyle({
          color: 'yellow',
          weight: 3,
          opacity: 1,
        }).bringToFront();
      });
      // reset style on mouseout
      layer.on("mouseout", function(e) {
        oxfordWealth1953.resetStyle(e.target);
      });

    }

  });

  var oxfordLotsOff = L.geoJson(oxford1859, {
    // style the layer
    style: function(feature) {

      return {
        stroke: 0,
        color: 'rgba(0,0,0,0.0)',
        strokeOpacity: 0,
        weight: 0,
        fillColor: 'rgba(0,0,0,0.0)',
        fillOpacity: 0,
      };
    },
  });

  var oxfordTypesOff = L.geoJson(oxford1870, {
    // style the layer
    style: function(feature) {

      return {
        stroke: 0,
        color: 'rgba(0,0,0,0.0)',
        strokeOpacity: 0,
        weight: 0,
        fillColor: 'rgba(0,0,0,0.0)',
        fillOpacity: 0,
      };
    },
  });

  var oxfordOriginsOff = L.geoJson(oxford1889, {
    // style the layer
    style: function(feature) {

      return {
        stroke: 0,
        color: 'rgba(0,0,0,0.0)',
        strokeOpacity: 0,
        weight: 0,
        fillColor: 'rgba(0,0,0,0.0)',
        fillOpacity: 0,
      };
    },
  });

  var oxfordWealthOff = L.geoJson(oxford1900, {
    // style the layer
    style: function(feature) {

      return {
        stroke: 0,
        color: 'rgba(0,0,0,0.0)',
        strokeOpacity: 0,
        weight: 0,
        fillColor: 'rgba(0,0,0,0.0)',
        fillOpacity: 0,
      };
    },
  });

  // create an info button to describe the map and supporting data
  var infoButton = L.easyButton({
    id: 'infoButton',
    position: 'topright',
    states: [{
      stateName: 'show-info',
      icon: '<strong>?</strong>',
      title: 'Tell me about this map',
      onClick: function(btn, map) {
        $("#dialog").dialog({
          position: {
            my: 'middle',
            at: 'top+450'
          },
        });
      }
    }]
  }).addTo(map);

  var groupedOverlays = {
    "<span class='controlHeading'>Property Boundaries</span>": {
      "Lot Boundaries, 1859": oxfordLots1859,
      "Lot Boundaries, 1870": oxfordLots1870,
      "Lot Boundaries, 1889": oxfordLots1889,
      "Lot Boundaries, 1900": oxfordLots1900,
      "Lot Boundaries, 1917": oxfordLots1917,
      "Lot Boundaries, 1934": oxfordLots1934,
      "Lot Boundaries, 1939": oxfordLots1939,
      "Lot Boundaries, 1948": oxfordLots1948,
      "Lot Boundaries, 1953": oxfordLots1953,
      "Off": oxfordLotsOff
    },
    "<span class='controlHeading'>Landowner Type</span>": {
      "Landowner Type, 1859": oxfordTypes1859,
      "Landowner Type, 1870": oxfordTypes1870,
      "Landowner Type, 1889": oxfordTypes1889,
      "Landowner Type, 1900": oxfordTypes1900,
      "Landowner Type, 1917": oxfordTypes1917,
      "Landowner Type, 1934": oxfordTypes1934,
      "Landowner Type, 1939": oxfordTypes1939,
      "Landowner Type, 1948": oxfordTypes1948,
      "Landowner Type, 1953": oxfordTypes1953,
      "Off": oxfordTypesOff
    },
    "<span class='controlHeading'>Family Origins</span>": {
      "Family Origins, 1859": oxfordOrigins1859,
      "Family Origins, 1870": oxfordOrigins1870,
      "Family Origins, 1889": oxfordOrigins1889,
      "Family Origins, 1900": oxfordOrigins1900,
      "Family Origins, 1917": oxfordOrigins1917,
      "Family Origins, 1934": oxfordOrigins1934,
      "Family Origins, 1939": oxfordOrigins1939,
      "Family Origins, 1948": oxfordOrigins1948,
      "Family Origins, 1953": oxfordOrigins1953,
      "Off": oxfordOriginsOff
    },
    "<span class='controlHeading'>Ownership Percentile</span>": {
      "Ownership Percentile, 1859": oxfordWealth1859,
      "Ownership Percentile, 1870": oxfordWealth1870,
      "Ownership Percentile, 1889": oxfordWealth1889,
      "Ownership Percentile, 1900": oxfordWealth1900,
      "Ownership Percentile, 1917": oxfordWealth1917,
      "Ownership Percentile, 1934": oxfordWealth1934,
      "Ownership Percentile, 1939": oxfordWealth1939,
      "Ownership Percentile, 1948": oxfordWealth1948,
      "Ownership Percentile, 1953": oxfordWealth1953,
      "Off": oxfordWealthOff
    }
  };

  var options = {
    // Make the "Base Maps" group exclusive (use radio inputs)
    exclusiveGroups: ["<span class='controlHeading'>Property Boundaries</span>", "<span class='controlHeading'>Landowner Type</span>", "<span class='controlHeading'>Family Origins</span>", "<span class='controlHeading'>Ownership Percentile</span>"],
    // Show a checkbox next to non-exclusive group labels for toggling all
    groupCheckboxes: true,
    collapsed: false
  };

  // Use the custom grouped layer control, not "L.control.layers"
  L.control.groupedLayers(null, groupedOverlays, options).addTo(map);

  $('.leaflet-control-layers-group-label').each(function(index) {
    var self = $(this),
      trigger = $('<label>', {
        class: 'trigger',
        for: 'dropdown-trigger-' + index
      }).insertBefore(self),
      radio = $('<input>', {
        type: 'radio',
        class: 'trigger-radio',
        name: 'dropdown-control',
        id: 'dropdown-trigger-' + index
      }).insertBefore(trigger);
  });

  /*
        L.control.tagFilterButton({
            data: ['Canada', 'E. Europe', 'Northeastern US', 'Germanic', 'Iowa', 'Midwestern US', 'Southern US', 'UK', 'N. Europe', 'No Data'],
            icon: '<i class="fas fa-globe" style="font-size:18px; padding-top: 6px;"></i>',
            filterOnEveryClick: true
        }).addTo(map);

  L.control.tagFilterButton({
    data: ["Owner: A.A. & M.J.", "Owner: A.N.C", "Owner: A.S.", "Owner: A.W.D", "Owner: Ackerman", "Owner: Ackermann", "Owner: Adams", "Owner: Add'n", "Owner: Ahern", "Owner: Ahren", "Owner: Ahrens", "Owner: Akerman", "Owner: Alexander", "Owner: Allen", "Owner: Amana", "Owner: Amana So.", "Owner: Amana Society", "Owner: Andrews", "Owner: Armstrong", "Owner: Art Colony", "Owner: Ayers", "Owner: B.", "Owner: B.c", "Owner: B.G.R", "Owner: Baack", "Owner: Babcock", "Owner: Baker", "Owner: Bane", "Owner: Barber", "Owner: Barnes", "Owner: Barnett", "Owner: Barry", "Owner: Baum", "Owner: Beard", "Owner: Becicka", "Owner: Beecher", "Owner: Bell", "Owner: Benda", "Owner: Benton", "Owner: Berry", "Owner: Berryhill", "Owner: Bettag", "Owner: BGR", "Owner: Bireline", "Owner: Black", "Owner: BO.R.", "Owner: Bogs", "Owner: Bond", "Owner: Borland", "Owner: Bostwick", "Owner: Brach", "Owner: Brack", "Owner: Brand", "Owner: Brant", "Owner: Bratton", "Owner: Brennan", "Owner: Brick", "Owner: Briney", "Owner: Brock", "Owner: Brogaard", "Owner: Brower", "Owner: Brown", "Owner: Brown & Ackerman", "Owner: Bryan", "Owner: Bryant", "Owner: Buckley", "Owner: Buhr", "Owner: Burke", "Owner: Burns", "Owner: Bvorah", "Owner: Byington", "Owner: C Moss", "Owner: C.A.D", "Owner: C.A.F", "Owner: C.A.W", "Owner: C.C.D.", "Owner: C.C.F.", "Owner: C.G.", "Owner: C.M", "Owner: C.R.I.P. R.R. Co.", "Owner: C.T.", "Owner: Camp", "Owner: Carmana", "Owner: Carmichael", "Owner: Carmona", "Owner: Carson", "Owner: Cary", "Owner: Casey", "Owner: Church", "Owner: Clapp", "Owner: Clark", "Owner: Clear", "Owner: Clearman", "Owner: Clensman", "Owner: Clodfelder", "Owner: Clodfelter", "Owner: Co.", "Owner: Co. Craig REc 1st Nat. Bank", "Owner: Cockran", "Owner: Collins", "Owner: Colony", "Owner: Colter", "Owner: Combe", "Owner: Comm of Ins. State of Iowa", "Owner: Connelly", "Owner: Conner", "Owner: Conners", "Owner: Cook", "Owner: Cooke", "Owner: Corbin", "Owner: Cotter", "Owner: Coulter", "Owner: Cox", "Owner: Crawford", "Owner: Cronin", "Owner: Cropley", "Owner: Crossen", "Owner: Crosson", "Owner: Culbertson", "Owner: Cummings", "Owner: Curry", "Owner: Curtis", "Owner: Cusak", "Owner: Cushing", "Owner: D", "Owner: D.", "Owner: D.C.", "Owner: D.E.", "Owner: D.L.D.", "Owner: D.M", "Owner: D.M.", "Owner: Daniels", "Owner: Darling", "Owner: Dascocil", "Owner: David", "Owner: Davis", "Owner: DE", "Owner: Degood", "Owner: Delaney", "Owner: Delany", "Owner: Delwiter", "Owner: Demirig", "Owner: Dennison", "Owner: Denson", "Owner: DePay", "Owner: Dolezal", "Owner: Dolmage", "Owner: Donahoe", "Owner: Donahue", "Owner: Donaldson", "Owner: Donhan", "Owner: Donovan", "Owner: Doty", "Owner: Douglas", "Owner: Douglass", "Owner: Dow", "Owner: Downey", "Owner: Doyle", "Owner: Drake", "Owner: Driscoll", "Owner: Dunn", "Owner: Durant", "Owner: Durlan", "Owner: Dutch", "Owner: Dvorak", "Owner: E. Life Ins Co of IA", "Owner: E.A", "Owner: E.A.H", "Owner: E.E.", "Owner: E.E.W.", "Owner: E.F.H", "Owner: E.G.F", "Owner: E.W. Clark Ins Com. of Ia.", "Owner: E.W. Clark Ins. Com. of IA", "Owner: E.W. Clark Ins. Com. of Ia.", "Owner: Earsha", "Owner: Eastman", "Owner: Eddy", "Owner: Edwards", "Owner: Elliot", "Owner: Elliott", "Owner: Emary", "Owner: Emmery", "Owner: Englesby", "Owner: English", "Owner: Equit Life Ins Co. of Iowa", "Owner: Equitable Life", "Owner: Equitable Life Assets", "Owner: Equitable Life Assurance Society of US", "Owner: Equitable Life Ins Co of Ia", "Owner: Equitable Life Ins Co of Iowa", "Owner: Equitable Life Ins of Ia", "Owner: Equitable Life Ins. Co. of Ia.", "Owner: Equitable Life of Ia", "Owner: Equitable Life of Ia.", "Owner: Ernest", "Owner: Erusha", "Owner: Ewing", "Owner: F.G.", "Owner: F.K.", "Owner: F.M.C", "Owner: Fairgrounds", "Owner: Fall", "Owner: Falls", "Owner: FD", "Owner: Feeser", "Owner: Ferguson", "Owner: FG", "Owner: Fischer", "Owner: Fisher", "Owner: Fitzgerald", "Owner: Flannery", "Owner: Flashinger", "Owner: Floerching", "Owner: Floerchinger", "Owner: Floerchino", "Owner: Flonckmyer", "Owner: Foley", "Owner: Ford", "Owner: Foster", "Owner: Fries", "Owner: Fuchs", "Owner: G", "Owner: G. Grace et al", "Owner: G.A", "Owner: G.C.", "Owner: Gaheen", "Owner: Ganer", "Owner: Garbin", "Owner: Gard", "Owner: Garitz", "Owner: Gegenheimer", "Owner: Geigenheimer", "Owner: Geigenheimer, Sacton, Cox", "Owner: Geiginhimer", "Owner: Geogenheimer", "Owner: Gibboney", "Owner: Gibbony", "Owner: Gill", "Owner: Gilroy", "Owner: Ginginmier", "Owner: Goben", "Owner: Gossenberger", "Owner: Gould", "Owner: Grabin", "Owner: Grace", "Owner: Graham", "Owner: Grauer", "Owner: Green", "Owner: Griffith", "Owner: Griswold", "Owner: Grobin", "Owner: Gunnette", "Owner: Gunzenhauser", "Owner: H", "Owner: H Stockman & J Burns Executors", "Owner: H.", "Owner: H. Stockman and J. Burns Executors", "Owner: H.C", "Owner: H.G", "Owner: H.H.", "Owner: H.T.S.", "Owner: H.V.", "Owner: H.W.", "Owner: Hacker", "Owner: Hackett", "Owner: Haman", "Owner: Hamilton", "Owner: Hampton", "Owner: Hanson", "Owner: Haperdesky", "Owner: Hardy", "Owner: Harker", "Owner: Harkowitz", "Owner: Harper", "Owner: Harter", "Owner: Hartwell", "Owner: Hasbett", "Owner: Hayes", "Owner: Heble", "Owner: Heifner", "Owner: Heitz", "Owner: Henderson", "Owner: Herring", "Owner: Herzer", "Owner: Hezer", "Owner: Hilborn", "Owner: Hilburn", "Owner: Hill", "Owner: Himmer", "Owner: Hloubec", "Owner: Hobart", "Owner: Hoefner", "Owner: Holderness", "Owner: Holle", "Owner: Hollingsworth", "Owner: Home for the Friendless", "Owner: Honebett", "Owner: Hospodarsky", "Owner: Hospodorsky", "Owner: Howard", "Owner: Hoyt", "Owner: Hrofta", "Owner: Hruby", "Owner: Hudepohl", "Owner: Huedepohl", "Owner: Huedlepohl", "Owner: Huff", "Owner: Hughes", "Owner: Huist", "Owner: Hummer", "Owner: Hutchison", "Owner: Hutt", "Owner: Illegible", "Owner: Imeel", "Owner: Immel", "Owner: Ivers", "Owner: Ives", "Owner: J", "Owner: J.B", "Owner: J.B.S", "Owner: J.D", "Owner: J.D.", "Owner: J.D.D", "Owner: J.E", "Owner: J.G", "Owner: J.H. Mut. Life Ins Co.", "Owner: J.H.D", "Owner: J.K", "Owner: J.L.B.", "Owner: J.M", "Owner: J.M.", "Owner: J.N.", "Owner: J.N.C", "Owner: J.P.O", "Owner: J.R.?", "Owner: J.R.E.", "Owner: J.R.O", "Owner: J.S", "Owner: J.S.", "Owner: J.T", "Owner: J.T.", "Owner: Jacobs", "Owner: Jennedy", "Owner: Jennings", "Owner: Jindrich", "Owner: Jiras", "Owner: Johnson", "Owner: Johnson Co.", "Owner: Jones", "Owner: Jos. A", "Owner: K", "Owner: K.L.K", "Owner: Kaceru", "Owner: Kadera", "Owner: Kadlera", "Owner: Kaefering", "Owner: Kaefring", "Owner: Kahler", "Owner: Kajora", "Owner: Keating", "Owner: Keebe", "Owner: Keefe", "Owner: Keller", "Owner: Kelley", "Owner: Kelly", "Owner: Kennedy", "Owner: Kennnedy", "Owner: Kershaw", "Owner: Kinney", "Owner: Kinsaler", "Owner: Kirf", "Owner: Kirkwood", "Owner: Kithcart", "Owner: Klamp", "Owner: Klaus", "Owner: Klenk", "Owner: Kloos", "Owner: Kloubec", "Owner: Kloubeo", "Owner: Klump", "Owner: Knight", "Owner: Kochera", "Owner: Kodera", "Owner: Koepler", "Owner: Kohler", "Owner: Kolovesk", "Owner: Koubec", "Owner: Kral", "Owner: Krall", "Owner: Krofta", "Owner: Krutcher", "Owner: Kucera", "Owner: Kuchera", "Owner: Kudera", "Owner: Kurcher", "Owner: Kursten", "Owner: Kutcher", "Owner: Kutchera", "Owner: Kuthavg", "Owner: L.B.", "Owner: L.C.", "Owner: L.D.", "Owner: L.H.", "Owner: L.K", "Owner: L.K.", "Owner: L.R.", "Owner: Landerbalk", "Owner: Larew", "Owner: Lathsop", "Owner: LC", "Owner: Lengle", "Owner: Lenoch", "Owner: Lewis", "Owner: LH", "Owner: Lindersmith", "Owner: Linkhart", "Owner: Logan", "Owner: Long", "Owner: Loomis", "Owner: Louderbeck", "Owner: Louis", "Owner: Loveless", "Owner: Lowrie", "Owner: LP", "Owner: Lucas", "Owner: Luse", "Owner: Luther", "Owner: Lyle", "Owner: M.A", "Owner: M.A.F", "Owner: M.A.H.", "Owner: M.B", "Owner: M.C", "Owner: M.C.", "Owner: M.F.", "Owner: M.H.H. & Co.", "Owner: M.L.", "Owner: M.M.", "Owner: M.S", "Owner: Maas", "Owner: Mace", "Owner: Maetter", "Owner: Maher", "Owner: Mahoney", "Owner: Mahony", "Owner: Mann", "Owner: Mannaugh", "Owner: Markham", "Owner: Marolf", "Owner: Marom", "Owner: Marrin", "Owner: Marvin", "Owner: Maske", "Owner: Mason", "Owner: Mass", "Owner: Mastern", "Owner: Maston", "Owner: Maynard", "Owner: McCaddon", "Owner: McCammon", "Owner: McCandless", "Owner: McCarthy", "Owner: McClandlers", "Owner: McCleary", "Owner: McCleery", "Owner: McCoy", "Owner: McCready", "Owner: McDonald", "Owner: McDonavan", "Owner: McDonnell", "Owner: McDonough", "Owner: McDonovan", "Owner: McDonoygh", "Owner: McFarland", "Owner: McGillicuddy", "Owner: McGillicundy", "Owner: McKee", "Owner: McLain", "Owner: McMicken", "Owner: McNutt", "Owner: McVean", "Owner: Mead", "Owner: Meade", "Owner: Mechler", "Owner: Meeks", "Owner: Mendenhall", "Owner: Mer. Nat. Bank Trustee", "Owner: Merritt", "Owner: Michael", "Owner: Micheal", "Owner: Michler", "Owner: Mill Owners Mutual", "Owner: Mill Owners Mutual Fire Ins Co", "Owner: Miller", "Owner: Minick", "Owner: Misnouski", "Owner: Missel", "Owner: Mitchell", "Owner: MK", "Owner: Moher", "Owner: Mooney", "Owner: Moreland", "Owner: Morgan", "Owner: Morrisey", "Owner: Morrissey", "Owner: Morrisy", "Owner: Morton", "Owner: Moscow", "Owner: Moske", "Owner: Moss", "Owner: Mouchka", "Owner: MsCleery", "Owner: Mueller", "Owner: Murray", "Owner: Musser", "Owner: Myers", "Owner: N.G.", "Owner: N.W. Mut. Life Ins. Co", "Owner: N.W. Mut. Life Ins. Co.", "Owner: Nat'l Life Ins Co", "Owner: Nels", "Owner: Newkirk", "Owner: Niebuhr", "Owner: Nixon", "Owner: Novak", "Owner: NW Mutual Life Ins Co", "Owner: O.B.", "Owner: O'Connor", "Owner: Oake", "Owner: Oakes", "Owner: Oaks", "Owner: Oilon", "Owner: Olive", "Owner: Olney", "Owner: Ooty", "Owner: Orabin", "Owner: Orauer", "Owner: Osborn", "Owner: Ostericher", "Owner: Ostricha", "Owner: Ovoyak", "Owner: OXFORD", "Owner: P", "Owner: P.B", "Owner: P.B.", "Owner: P.W", "Owner: Patlick", "Owner: Patrick", "Owner: Paul", "Owner: Pickner", "Owner: Pitlick", "Owner: Plympton", "Owner: Potlick", "Owner: Powell", "Owner: Power", "Owner: Price", "Owner: Proudpit", "Owner: Purcell", "Owner: Quinlan", "Owner: R", "Owner: Ra?", "Owner: Rahoney", "Owner: Rapp", "Owner: Recon. Finance Corp. U.S.", "Owner: Reed", "Owner: Reede", "Owner: Reid", "Owner: Reis", "Owner: Remley", "Owner: Reno", "Owner: Renolds", "Owner: Rentz", "Owner: Renz", "Owner: Ricord", "Owner: Riddle", "Owner: Riddley", "Owner: Ries", "Owner: Rihret. B.G.", "Owner: Robinson", "Owner: Rohret", "Owner: Ronret", "Owner: Ross", "Owner: Rouke", "Owner: Rourk", "Owner: Rourke", "Owner: Rudolf", "Owner: S", "Owner: S.G. & Co.", "Owner: S.J.B.", "Owner: S.K", "Owner: S.S.", "Owner: Sargent", "Owner: Saxon", "Owner: Saxton", "Owner: Scalan", "Owner: Scanlon", "Owner: Scheetz", "Owner: Schilling", "Owner: Schmidt", "Owner: Schneider", "Owner: Schoenfelden", "Owner: Schonborn", "Owner: Schreider", "Owner: Schropp", "Owner: Schupitor", "Owner: Sclropp", "Owner: Scott", "Owner: Sedlacek", "Owner: Senar", "Owner: Sentman", "Owner: Serbousek", "Owner: Sexton", "Owner: Shaefer", "Owner: Shebetka", "Owner: Shebitka", "Owner: Sheen", "Owner: Sheletka", "Owner: Shepardson", "Owner: Sher", "Owner: Sherlock", "Owner: Shibetka", "Owner: Shultz", "Owner: Shupater", "Owner: Shupitar", "Owner: Shupitor", "Owner: Sies", "Owner: Sippy", "Owner: Smell", "Owner: Smith", "Owner: Smykil", "Owner: Speers", "Owner: SPH", "Owner: Spillam", "Owner: Spilman", "Owner: Sponar", "Owner: Sponarse", "Owner: Sponarser", "Owner: Spooner", "Owner: Spratt", "Owner: Staley", "Owner: Starr", "Owner: State Board Education", "Owner: State Board of Education", "Owner: Steminsky", "Owner: Stockman", "Owner: Stockman and Burns", "Owner: Stone", "Owner: Stoner", "Owner: Stratton", "Owner: Streizenski", "Owner: Stricker", "Owner: Struznski", "Owner: Struzynski", "Owner: Summerhay", "Owner: Summerhays", "Owner: Supt. of Banking", "Owner: Swanson", "Owner: T.B", "Owner: T.C.", "Owner: T.E", "Owner: T.G.G", "Owner: T.J.H.", "Owner: Taylor", "Owner: Thomas", "Owner: Thompson", "Owner: Thos. Cox", "Owner: Titus", "Owner: Tlorchmyer", "Owner: Tomas", "Owner: Tomash", "Owner: Toomey", "Owner: Tracts", "Owner: Trantar", "Owner: Tranter", "Owner: Trav. Ins CO", "Owner: Traveler's Ins Co", "Owner: Travelers Ins.", "Owner: Travelers Ins. Co.", "Owner: Troulman", "Owner: Tucker", "Owner: Updegraff", "Owner: USA", "Owner: Vanderlip", "Owner: Vecerha", "Owner: Vecerka", "Owner: Venter", "Owner: Vercerko", "Owner: Vermace", "Owner: Voelker", "Owner: W.A.D.", "Owner: W.E", "Owner: W.F.S.", "Owner: W.G.", "Owner: W.H.H.", "Owner: W.N.", "Owner: Wagner", "Owner: Walker", "Owner: Wallace", "Owner: Walter", "Owner: Walters", "Owner: Wanderberg", "Owner: Ward", "Owner: Wardenburg", "Owner: Waterman", "Owner: Webster", "Owner: Wegmuller", "Owner: Welch", "Owner: Welsh", "Owner: Wenman", "Owner: Wentz", "Owner: Weomuller", "Owner: Werba", "Owner: Werger", "Owner: Wesiner", "Owner: Wheeler", "Owner: White", "Owner: Whitnush", "Owner: Whittington", "Owner: Wilcox", "Owner: Williams", "Owner: Wilson", "Owner: Winder", "Owner: Wismer", "Owner: Wisnouski", "Owner: Wisnousky", "Owner: Wolf", "Owner: Woods", "Owner: Work", "Owner: Worton", "Owner: Wray", "Owner: Wright", "Owner: Yenter", "Owner: Yenton", "Owner: Young", "Owner: Zabortsky"],
    icon: '<i class="fas fa-user-circle" style="font-size:18px; padding-top: 6px;"></i>',
    filterOnEveryClick: true
  }).addTo(map);

        L.control.tagFilterButton({
          data: ['Top 10% of landowners by acreage', 'Top 25% of landowners by acreage', 'Top 50% of landowners by acreage'],
          icon: '<i class="fas fa-border-all" style="font-size:18px; padding-top: 6px;"></i>',
          filterOnEveryClick: true
        }).addTo(map);

  jQuery('.easy-button-button').click(function() {
    target = jQuery('.easy-button-button').not(this);
    target.parent().find('.tag-filter-tags-container').css({
      'display': 'none',
    });
  });

  //disable dragging of the map after clicking a filter button
  jQuery('.easy-button-button').click(function() {
    map.dragging.disable();
  });

  //enable dragging of the map after clicking on the map
  map.on('click', function() {
    map.dragging.enable();
  });

        var baseMaps = [
          {
  					groupName : "Property Boundaries",
  					expanded : false,
  					layers : {
              "Lot Boundaries, 1859": oxfordLots1859,
              "Lot Boundaries, 1870": oxfordLots1870,
              "Lot Boundaries, 1889": oxfordLots1889,
              "Lot Boundaries, 1900": oxfordLots1900,
              "Lot Boundaries, 1917": oxfordLots1917,
              "Lot Boundaries, 1934": oxfordLots1934,
              "Lot Boundaries, 1939": oxfordLots1939,
              "Lot Boundaries, 1948": oxfordLots1948,
              "Lot Boundaries, 1953": oxfordLots1953,
  					}
  				},
          {
  					groupName : "Landowner Type",
  					expanded : false,
  					layers : {
              "Landowner Type, 1859": oxfordTypes1859,
              "Landowner Type, 1870": oxfordTypes1870,
              "Landowner Type, 1889": oxfordTypes1889,
              "Landowner Type, 1900": oxfordTypes1900,
              "Landowner Type, 1917": oxfordTypes1917,
              "Landowner Type, 1934": oxfordTypes1934,
              "Landowner Type, 1939": oxfordTypes1939,
              "Landowner Type, 1948": oxfordTypes1948,
              "Landowner Type, 1953": oxfordTypes1953,
  					}
  				},
          {
  					groupName : "Family Origins",
  					expanded : false,
  					layers : {
              "Family Origins, 1859": oxfordOrigins1859,
              "Family Origins, 1870": oxfordOrigins1870,
              "Family Origins, 1889": oxfordOrigins1889,
              "Family Origins, 1900": oxfordOrigins1900,
              "Family Origins, 1917": oxfordOrigins1917,
              "Family Origins, 1934": oxfordOrigins1934,
              "Family Origins, 1939": oxfordOrigins1939,
              "Family Origins, 1948": oxfordOrigins1948,
              "Family Origins, 1953": oxfordOrigins1953,
  					}
  				},
          {
  					groupName : "Ownership Percentile",
  					expanded : false,
  					layers : {
              "Ownership Percentile, 1859": oxfordWealth1859,
              "Ownership Percentile, 1870": oxfordWealth1870,
              "Ownership Percentile, 1889": oxfordWealth1889,
              "Ownership Percentile, 1900": oxfordWealth1900,
              "Ownership Percentile, 1917": oxfordWealth1917,
              "Ownership Percentile, 1934": oxfordWealth1934,
              "Ownership Percentile, 1939": oxfordWealth1939,
              "Ownership Percentile, 1948": oxfordWealth1948,
              "Ownership Percentile, 1953": oxfordWealth1953,
  					}
  				},
  			];

        var options = {
  				container_width 	: "300px",
  				group_maxHeight     : "80px",
  				//container_maxHeight : "350px",
  				exclusive       	: true
  			};

  		  var control = L.Control.styledLayerControl(baseMaps, null, options);
  			map.addControl(control);

        //disable dragging of the map after clicking the layer control
        jQuery('.ac-container').click(function() {
          map.dragging.disable();
        });

        //disable dragging of the map after scrolling the layer control
        jQuery('.ac-container').scroll(function() {
          map.dragging.disable();
        });

        //enable dragging of the map after clicking on the map
        map.on('click', function() {
          map.dragging.enable();
        });
  */

  var searchControl1859 = new L.Control.Search({
    layer: oxfordLots1859,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1859.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1859.eachLayer(function(layer) { //restore feature color
      oxfordLots1859.resetStyle(layer);
    });
  });

  map.addControl(searchControl1859); //initialize this search control because it is the default

  var searchControl1870 = new L.Control.Search({
    layer: oxfordLots1870,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1870.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1870.eachLayer(function(layer) { //restore feature color
      oxfordLots1870.resetStyle(layer);
    });
  }); // end search control

  var searchControl1889 = new L.Control.Search({
    layer: oxfordLots1889,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1889.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1889.eachLayer(function(layer) { //restore feature color
      oxfordLots1889.resetStyle(layer);
    });
  }); // end search control

  var searchControl1900 = new L.Control.Search({
    layer: oxfordLots1900,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1900.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1900.eachLayer(function(layer) { //restore feature color
      oxfordLots1900.resetStyle(layer);
    });
  }); // end search control

  var searchControl1917 = new L.Control.Search({
    layer: oxfordLots1917,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1917.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1917.eachLayer(function(layer) { //restore feature color
      oxfordLots1917.resetStyle(layer);
    });
  }); // end search control

  var searchControl1934 = new L.Control.Search({
    layer: oxfordLots1934,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1934.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1934.eachLayer(function(layer) { //restore feature color
      oxfordLots1934.resetStyle(layer);
    });
  }); // end search control

  var searchControl1939 = new L.Control.Search({
    layer: oxfordLots1939,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1939.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1939.eachLayer(function(layer) { //restore feature color
      oxfordLots1939.resetStyle(layer);
    });
  }); // end search control

  var searchControl1948 = new L.Control.Search({
    layer: oxfordLots1948,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1948.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1948.eachLayer(function(layer) { //restore feature color
      oxfordLots1948.resetStyle(layer);
    });
  }); // end search control

  var searchControl1953 = new L.Control.Search({
    layer: oxfordLots1953,
    propertyName: 'surname',
    marker: false,
    moveToLocation: function(latlng, title, map) {
      //map.fitBounds( latlng.layer.getBounds() );
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });

  searchControl1953.on('search:locationfound', function(e) {

    //console.log('search:locationfound', );

    //map.removeLayer(this._markerSearch)

    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();

  }).on('search:collapsed', function(e) {

    oxfordLots1953.eachLayer(function(layer) { //restore feature color
      oxfordLots1953.resetStyle(layer);
    });
  }); // end search control

  // create legend for ownership type
  var typeLegend = L.control({
    position: 'bottomright'
  });

  // create legend for the family origins
  var originLegend = L.control({
    position: 'bottomright'
  });

  // create legend for ownership percentiles
  var wealthLegend = L.control({
    position: 'bottomright'
  });

  // add content to the legend
  typeLegend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = ['Absentee', 'Corporation', 'Resident'],
      labels = ["<h3 style='font-size:14px; font-weight:bold'>Land Ownership Type</h3>"];

    // loop through our origins and generate a label with a colored square for each
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        labels.push('<i style="background:' + getColorType(grades[i]) + '"></i> ' +
          (grades[i]));
    }
    div.innerHTML = labels.join('<br>');
    return div;
  };

  // add content to the legend
  originLegend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = ['Austria-Hungary-Czech', 'Eastern U.S.', 'Germany', 'Iowa', 'Ireland', 'Midwest U.S.', 'UK', 'Other'],
      labels = ["<h3 style='font-size:14px; font-weight:bold'>Family Origins</h3>"];

    // loop through our origins and generate a label with a colored square for each
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        labels.push('<i style="background:' + getColorOrigin(grades[i]) + '"></i> ' +
          (grades[i]));
    }
    div.innerHTML = labels.join('<br>');
    return div;
  };

  // add content to the legend
  wealthLegend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = ['Top 10%', 'Middle 40%', 'Bottom 50%'],
      labels = ["<h3 style='font-size:14px; font-weight:bold'>Land Ownership Percentile</h3>"];

    // loop through our origins and generate a label with a colored square for each
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        labels.push('<i style="background:' + getColorWealth(grades[i]) + '"></i> ' +
          (grades[i]));
    }
    div.innerHTML = labels.join('<br>');
    return div;
  };

  // add this legend to the map, because the associated layer is on by default
  //originLegend.addTo(map);

  // when the user changes the baselayer, switch the legend
  map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name.includes('Landowner Type')) {
      this.removeControl(originLegend);
      this.removeControl(wealthLegend);
      typeLegend.addTo(this);
    }
    if (eventLayer.name.includes('Family Origins')) {
      this.removeControl(typeLegend);
      this.removeControl(wealthLegend);
      originLegend.addTo(this);
    }
    if (eventLayer.name.includes('Ownership Percentile')) {
      this.removeControl(typeLegend);
      this.removeControl(originLegend);
      wealthLegend.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries')) {
      this.removeControl(originLegend);
      this.removeControl(typeLegend);
      this.removeControl(wealthLegend);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1859')) {
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1948);
      this.removeControl(searchControl1953);
      searchControl1859.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1870')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1948);
      this.removeControl(searchControl1953);
      searchControl1870.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1889')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1948);
      this.removeControl(searchControl1953);
      searchControl1889.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1900')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1948);
      this.removeControl(searchControl1953);
      searchControl1900.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1917')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1948);
      this.removeControl(searchControl1953);
      searchControl1917.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1934')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1948);
      this.removeControl(searchControl1953);
      searchControl1934.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1939')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1948);
      this.removeControl(searchControl1953);
      searchControl1939.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1948')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1953);
      searchControl1948.addTo(this);
    }
    if (eventLayer.name.includes('Lot Boundaries, 1953')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1948);
      searchControl1953.addTo(this);
    }
    if (eventLayer.name.includes('Off')) {
      this.removeControl(searchControl1859);
      this.removeControl(searchControl1870);
      this.removeControl(searchControl1889);
      this.removeControl(searchControl1900);
      this.removeControl(searchControl1917);
      this.removeControl(searchControl1934);
      this.removeControl(searchControl1939);
      this.removeControl(searchControl1948);
      this.removeControl(searchControl1953);
    }
  });

}; // end drawMap function
