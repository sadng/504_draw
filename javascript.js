var map = L.map('map').setView([19.35, -155.2], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic3FuZ3V5ZW4iLCJhIjoiY2w5eXd1YXc0MDk3MjNucDg2cDhyN3JrbyJ9.aMzoD2AZBPUtaVP2yV5N-A'
}).addTo(map);

var drawnItems = L.featureGroup().addTo(map);

new L.Control.Draw({
    draw : {
        polygon : false,
        polyline : true,
        rectangle : false,                                                      // Rectangles disabled
        circle : false,                                                         // Circles disabled 
        circlemarker : false,                                                   // Circle markers disabled
        marker: true
    },
    edit : {
        featureGroup: drawnItems
    }
}).addTo(map);

function createFormPopup() {                                                    //Creating the form popup
    var popupContent = 
        '<form>' + 
        'Starting plate pin ID:' +
            '<input type="text" id="plateone"><br>' +
        'Is the first pole on the starting plate pin?<br>' +
            '<input type="radio" id="platey" name="platestart" value="yes">' +
                '<label for="Yes">Yes</label>' +
            '<input type="radio" id="platen" name="platestart" value="no">' +
                '<label for="no">No</label><br>' +
        'Goal plate pin ID:' +
            '<input type="text" id="goalplate"><br>' +
        'Is the second pole on the goal plate pin?<br>' +
            '<input type="radio" id="goaly" name="plategoal" value="yes">' +
                '<label for="Yes">Yes</label>' +
            '<input type="radio" id="goaln" name="plategoal" value="no">' +
                '<label for="no">No</label><br>' +
        'Calculation measurments:<br>' +
            '<input type="number" id="calculationsf" name="calcone" min="1" max="1000"><br>' +
            '<input type="number" id="calculationsf" name="calctwo" min="1" max="1000"><br>' +
            '<input type="number" id="calculationsf" name="calcthree" min="1" max="1000"><br>' +
            '<input type="number" id="calculationsf" name="calcfour" min="1" max="1000"><br>' +
        'Collection date:' +
            '<input type="date" id="datetoday" name="date"><br>' +
        '<input type="button" value="Submit" id="submit">' +
        '</form>'
    drawnItems.bindPopup(popupContent).openPopup();
}

map.addEventListener("draw:created", function(e) {                              //Event listener for created/drawn shapes.
    e.layer.addTo(drawnItems);
    createFormPopup();
});

function setData(e) {
    if(e.target && e.target.id == "submit") {
        var startf = document.getElementById("plateone").value;      // Get user name and description
        var starty = document.getElementById("platey").value;
        var startn = document.getElementById("platen").value;
        var endf = document.getElementById("goalplate").value;
        var endy = document.getElementByID("goaly").value;
        var endn = document.getElementByID("goaln").value;
        var calcf = document.getElementByID("calculationsf").value;
        var datef = document.getElementByID("datetoday").value;
        console.log(startf);                                           // Print user name and description
        console.log(starty);
        console.log(startn);
        console.log(endf);
        console.log(endy);
        console.log(endn);
        console.log(calcf);
        console.log(datef);
        drawnItems.eachLayer(function(layer) {                                  // Get and print GeoJSON for each drawn layer
            var drawing = JSON.stringify(layer.toGeoJSON().geometry);
            console.log(drawing);
        });
        drawnItems.closePopup();                                                // Clear drawn items layer
        drawnItems.clearLayers();
    }
}

document.addEventListener("click", setData);

