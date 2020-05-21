
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

      var oxfordOff1859 = L.geoJson(oxford1859, {
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorType(feature.properties.owntype),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorOrigin(feature.properties.fam_origin),
            fillOpacity: 0.5,
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

          return {
            stroke: 1,
            color: 'white',
            strokeOpacity: 1,
            weight: 1,
            fillColor: getColorWealth(feature.properties.wealth_percentile),
            fillOpacity: 0.5,
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

      // create an info button to describe the map and supporting data
      var infoButton = L.easyButton({
        id: 'infoButton',
        position: 'topright',
        states: [{
          stateName: 'show-info',
          icon: '<strong>?</strong>',
          title: 'Tell me about this map',
          onClick: function(btn, map) {
            $("#dialog").dialog({ position: { my: 'middle', at: 'top+300'}, });
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

      $('.leaflet-control-layers-group-label').each(function(index){
      	var self = $(this),
        		trigger = $('<label>', {
              class:'trigger',
              for: 'dropdown-trigger-' + index
            }).insertBefore(self),
            radio = $('<input>', {
            	type : 'radio',
              class: 'trigger-radio',
              name : 'dropdown-control',
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
        data: ['Owner: A.S.', 'Owner: Ackerman', 'Owner: Adams', 'Owner: Ahren', 'Owner: Alexander', 'Owner: Amana Society', 'Owner: Baker', 'Owner: Barnes', 'Owner: Barry', 'Owner: Baum', 'Owner: Bell', 'Owner: Benton', 'Owner: Berryhill', 'Owner: Bireline', 'Owner: Black', 'Owner: Bond', 'Owner: Bostwick', 'Owner: Brant', 'Owner: Brennan', 'Owner: Brick', 'Owner: Brown', 'Owner: Bryant', 'Owner: C.R.I.P. R.R. Co.', 'Owner: Carson', 'Owner: Cary', 'Owner: Church', 'Owner: Clark', 'Owner: Clear', 'Owner: Clensman', 'Owner: Clodfelter', 'Owner: Co.', 'Owner: Collins', 'Owner: Combe', 'Owner: Conner', 'Owner: Conners', 'Owner: Cook', 'Owner: Cooke', 'Owner: Corbin', 'Owner: Cotter', 'Owner: Cox', 'Owner: Crawford', 'Owner: Crossen', 'Owner: Curtis', 'Owner: Cushing', 'Owner: D.L.D.', 'Owner: Daniels', 'Owner: Darling', 'Owner: David', 'Owner: Delaney', 'Owner: Delwiter', 'Owner: Donahoe', 'Owner: Donaldson', 'Owner: Donhan', 'Owner: Doty', 'Owner: Douglass', 'Owner: Downey', 'Owner: Durant', 'Owner: Dutch', 'Owner: E.E.', 'Owner: E.E.W.', 'Owner: Eddy', 'Owner: Edwards', 'Owner: Elliott', 'Owner: Emary', 'Owner: Emmery', 'Owner: English', 'Owner: Ewing', 'Owner: Fall', 'Owner: Ferguson', 'Owner: Fitzgerald', 'Owner: Floerchinger', 'Owner: Foley', 'Owner: Foster', 'Owner: Gaheen', 'Owner: Gard', 'Owner: Garitz', 'Owner: Geigenheimer', 'Owner: Gibbony', 'Owner: Gilroy', 'Owner: Goben', 'Owner: Gossenberger', 'Owner: Gould', 'Owner: H.', 'Owner: H.T.S.', 'Owner: Hamilton', 'Owner: Hardy', 'Owner: Harkowitz', 'Owner: Harper', 'Owner: Hartwell', 'Owner: Hayes', 'Owner: Heifner', 'Owner: Heitz', 'Owner: Henderson', 'Owner: Hilborn', 'Owner: Holle', 'Owner: Howard', 'Owner: Huff', 'Owner: Hughes', 'Owner: Hutt', 'Owner: Imeel', 'Owner: Ives', 'Owner: J.D.', 'Owner: J.M.', 'Owner: J.N.', 'Owner: J.R.?', 'Owner: Jacobs', 'Owner: Johnson Co.', 'Owner: Kadera', 'Owner: Kelly', 'Owner: Kennedy', 'Owner: Kershaw', 'Owner: Kirf', 'Owner: Klaus', 'Owner: Klenk', 'Owner: Krall', 'Owner: L.C.', 'Owner: L.R.', 'Owner: Landerbalk', 'Owner: Lengle', 'Owner: Linkhart', 'Owner: Logan', 'Owner: Loveless', 'Owner: Lucas', 'Owner: Luse', 'Owner: Lyle', 'Owner: M.H.H. & Co.', 'Owner: Maetter', 'Owner: Maher', 'Owner: Mahoney', 'Owner: Mahony', 'Owner: Markham', 'Owner: Marvin', 'Owner: Mastern', 'Owner: McCaddon', 'Owner: McCandless', 'Owner: McDonough', 'Owner: McFarland', 'Owner: McGillicuddy', 'Owner: McKee', 'Owner: McVean', 'Owner: Mechler', 'Owner: Mendenhall', 'Owner: Merritt', 'Owner: Moreland', 'Owner: Myers', 'Owner: Nels', 'Owner: Novak', 'Owner: Oakes', 'Owner: Oaks', 'Owner: Osborn', 'Owner: Ostericher', 'Owner: Plympton', 'Owner: Price', 'Owner: Ra?', 'Owner: Remley', 'Owner: Rentz', 'Owner: Renz', 'Owner: Rourk', 'Owner: S.S.', 'Owner: Saxon', 'Owner: Saxton', 'Owner: Schonborn', 'Owner: Scott', 'Owner: Sheen', 'Owner: Sies', 'Owner: Smith', 'Owner: Spillam', 'Owner: Starr', 'Owner: Stone', 'Owner: Stratton', 'Owner: T.C.', 'Owner: Taylor', 'Owner: Thomas', 'Owner: Thompson', 'Owner: Tranter', 'Owner: Troulman', 'Owner: Vanderlip', 'Owner: Voelker', 'Owner: W.A.D.', 'Owner: W.G.', 'Owner: Wagner', 'Owner: Wallace', 'Owner: Walters', 'Owner: Ward', 'Owner: Waterman', 'Owner: Welch', 'Owner: Wentz', 'Owner: Wesiner', 'Owner: Wilcox', 'Owner: Williams', 'Owner: Winder', 'Owner: Woods', 'Owner: Yenter'],
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

      var baseMaps = {
        "Lot Boundaries, 1859": oxfordLots1859,
        "Lot Boundaries, 1870": oxfordLots1870,
        "Lot Boundaries, 1889": oxfordLots1889,
        "Lot Boundaries, 1900": oxfordLots1900,
        "Lot Boundaries, 1917": oxfordLots1917,
        "Lot Boundaries, 1934": oxfordLots1934,
        "Lot Boundaries, 1939": oxfordLots1939,
        "Lot Boundaries, 1948": oxfordLots1948,
        "Lot Boundaries, 1953": oxfordLots1953,
        "Landowner Type, 1859": oxfordTypes1859,
        "Landowner Type, 1870": oxfordTypes1870,
        "Landowner Type, 1889": oxfordTypes1889,
        "Landowner Type, 1900": oxfordTypes1900,
        "Landowner Type, 1917": oxfordTypes1917,
        "Landowner Type, 1934": oxfordTypes1934,
        "Landowner Type, 1939": oxfordTypes1939,
        "Landowner Type, 1948": oxfordTypes1948,
        "Landowner Type, 1953": oxfordTypes1953,
        "Family Origins, 1859": oxfordOrigins1859,
        "Family Origins, 1870": oxfordOrigins1870,
        "Family Origins, 1889": oxfordOrigins1889,
        "Family Origins, 1900": oxfordOrigins1900,
        "Family Origins, 1917": oxfordOrigins1917,
        "Family Origins, 1934": oxfordOrigins1934,
        "Family Origins, 1939": oxfordOrigins1939,
        "Family Origins, 1948": oxfordOrigins1948,
        "Family Origins, 1953": oxfordOrigins1953,
        "Ownership Percentile, 1859": oxfordWealth1859,
        "Ownership Percentile, 1870": oxfordWealth1870,
        "Ownership Percentile, 1889": oxfordWealth1889,
        "Ownership Percentile, 1900": oxfordWealth1900,
        "Ownership Percentile, 1917": oxfordWealth1917,
        "Ownership Percentile, 1934": oxfordWealth1934,
        "Ownership Percentile, 1939": oxfordWealth1939,
        "Ownership Percentile, 1948": oxfordWealth1948,
        "Ownership Percentile, 1953": oxfordWealth1953,
      };

      //var overlays = {
        //"Family Origins, 1859": oxfordOrigins1859,
      //}

      // all done with the layers, add them to layer control
      L.control.layers(baseMaps, null, {
        collapsed: true,
      }).addTo(map);

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
      map.on('baselayerchange', function(eventLayer) {
        if (eventLayer.name.includes('Landowner Type')) {
          this.removeControl(originLegend);
          this.removeControl(wealthLegend);
          typeLegend.addTo(this);
        } if (eventLayer.name.includes('Family Origins')) {
          this.removeControl(typeLegend);
          this.removeControl(wealthLegend);
          originLegend.addTo(this);
        } if (eventLayer.name.includes('Ownership Percentile')) {
          this.removeControl(typeLegend);
          this.removeControl(originLegend);
          wealthLegend.addTo(this);
        } if (eventLayer.name.includes('Lot Boundaries')) {
          this.removeControl(originLegend);
          this.removeControl(typeLegend);
          this.removeControl(wealthLegend);
        }
      });

    }; // end drawMap function
