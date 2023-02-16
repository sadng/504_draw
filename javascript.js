var map = L.map('map').setView([19.359372, -155.268355], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/satellite-streets-v12',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic3FuZ3V5ZW4iLCJhIjoiY2w5eXd1YXc0MDk3MjNucDg2cDhyN3JrbyJ9.aMzoD2AZBPUtaVP2yV5N-A'
}).addTo(map);

L.Control.measureControl().addTo(map);

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

function createFormPopup() {
    var popupContent = 
        '<form>' + 
        'Starting plate pin ID:<br><input type="text" id="pinstart"><br>' +
        'Is the first pole on the starting plate pin?<br>' +
        '<input type="radio" id="yespin" name="startpin" value="yes">' +
        '<label for="yespin">Yes</label>' +
        '<input type="radio" id="nopin" name="startpin" value="no">' +
        '<label for="nopin">No</label><br>' +
        'Goal plate pin ID:<br><input type="text" id="pinend"><br>' +
        '<input type="radio" id="yesgoal" name="goalpin" value="yes">' +
        '<label for="yesgoal">Yes</label>' +
        '<input type="radio" id="nogoal" name="goalpin" value="no">' +
        '<label for="nogoal">No</label><br>' +
        'Calculation measurements:<br>'+
        '<input type="number" id="calcone" name="calcone"><br>' +
        '<input type="number" id="calctwo" name="calctwo"><br>' +
        '<input type="number" id="calcthree" name="calcthree"><br>' +
        '<input type="number" id="calcfour" name="calcfour"><br>' +
        'Collection date:' +
        '<input type="date" id="collect" name="collect"><br>' +
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
        var pinstart = document.getElementById("pinstart").value;               // Get user name and description
        var radiostart = document.getElementsByTagName("startpin").value;       // Error given if individually by tag name
        var pingoal = document.getElementById("pinend").value;
        var radiogoal = document.getElementsByTagName("goalpin").value;         // Error given if individually by tag name
        var calcone = document.getElementById("calcone").value;
        var calctwo = document.getElementById("calctwo").value;
        var calcthree = document.getElementById("calcthree").value;
        var calcfour = document.getElementById("calcfour").value;
        var collectday = document.getElementById("collect").value;
        console.log(pinstart);                                                  // Print user name and description
        console.log(radiostart);
        console.log(pingoal);
        console.log(radiogoal);
        console.log(calcone);
        console.log(calctwo);
        console.log(calcthree);
        console.log(calcfour);
        console.log(collectday);
        drawnItems.eachLayer(function(layer) {                                  // Get and print GeoJSON for each drawn layer
            var drawing = JSON.stringify(layer.toGeoJSON().geometry);
            console.log(drawing);
        });
        drawnItems.closePopup();                                                // Clear drawn items layer
        drawnItems.clearLayers();
    }
}

document.addEventListener("click", setData);