$(document).ready(function () {

    var newLocation = '';

    if (navigator.geolocation) {
        console.log(navigator.geolocation);

        function success(pos) {
            console.log(pos);

            var crds = pos.coords;
            //            console.log('my current position is: ');
            //            console.log('lat: ' + crds.latitude);
            //            console.log('long:' + crds.longitude);
            //            console.log('more or less:' + crds.accuracy + 'm away.');

            //set string for data for dark sky api based on their format

            newLocation = crds.latitude + ',' + crds.longitude;

            //this will set the string to retrive location based on open sky formate
            var latlongName = crds.latitude + '+' + crds.longitude;

            console.log(newLocation);

            //run function to get weather data from api
            getWeatherData(newLocation);

            //function to get location name
            getLocationName(latlongName);

        }

        function error(err) {
            console.log(err);

            //set default location - canberra
            var defaultLocation = '-35.28346,149.12807';

            getWeatherData(newLocation);
        }

        //this is the line that triggers the browser prompt
        navigator.geolocation.getCurrentPosition(success, error);

    }

}); //close document ready

//get location name

function getLocationName(latlngCoords) {

    var apiKey = 'c89f5a299176437ea002fecc8d8b544b';

    var geocodeUrl = 'http://api.opencagedata.com/geocode/v1/json?q=' + latlngCoords + '&key=' + apiKey;

    $.get(geocodeUrl, function (locationData) {
        console.log(locationData.results[0]);

        var locationComponent = locationData.results[0].components;

        var locString = locationComponent.suburb + ', ' + locationComponent.state_code;

        var location = $('<h1>').text("In: " + locString);

        //add to body
        $("currently").append(location);

    });

};

//this function will load data from darksky api
function getWeatherData(currentLocation) {

    //my secret key
    var key = '80fa44f25c6d60fb504e7a003ddd88ad';


    //api call
    var url = 'https://api.darksky.net/forecast/' + key + '/' + currentLocation + '?units=auto&callback=?';
    console.log(url);

    $.getJSON(url, function (data) {

        //create new date object
        var now = new Date(data.currently.time * 1000);
        //get date and display
        var time = $("<p>").text("At: " + now.toDateString() + ", " + now.toTimeString());
        //add to body
        //$("#currently").append(time);
        
        //get summary
       // var summary = $("<h2>").html("" + data.currently.summary);
        //$("#currently").append(summary);
        
        var iconImage = ''; //set empty image string
        var cIcon = data.currently.icon; //shortcut for data

        //icon image files
        var sunIcon = 'assets/images/sun.png';
        var cloudSunIcon = 'assets/images/suncloud.png';
        var cloudMoonIcon = 'assets/images/cloudnight.png';
        var moonIcon = 'assets/images/night.png';
        var rainIcon = 'assets/images/rain.png';
        var windyIcon = 'assets/images/wind.png';
        var cloudyIcon = 'assets/images/cloud.png';
        var coldIcon = 'assets/images/cold.png';//display the right icon

        //mega if statement 
        // there are other more efficient ways to do this... but you can see the logic here. 
        if (cIcon === 'clear-day') {
            iconImage = sunIcon;				
        } else if (cIcon === 'cloudy') {
            iconImage = cloudyIcon;		
        } else if (cIcon === 'rain') {
            iconImage = rainIcon;
        } else if (cIcon === 'clear-night') {
            iconImage = moonIcon;
        } else if (cIcon === 'partly-cloudy-night') {
            iconImage = cloudMoonIcon;
        } else if (cIcon === 'partly-cloudy-day') {
            iconImage = cloudSunIcon;
        } else if (cIcon === 'snow') {
            iconImage = coldIcon;
        } else if (cIcon === 'wind') {
            iconImage = windyIcon;
        }
        $('.icons').html('<img src="' + iconImage + '">');
           
        //get current temp
        var currently = $("<h1>").html (" " + Math.round (data.currently.temperature) + "&deg;C");
        //add it to body
        $("#currently").append(currently);

        //get apparent temperature
        var apparentTemperature = $("<p>").html("Feels like: " + Math.round (data.currently.apparentTemperature) + "&deg;C");
        $("#currently").append(apparentTemperature);

        //loop through the data and add it the table
        //new row for each new item

        for (var i = 0; i < data.daily.data.length; i++) {
            var f = data.daily.data[i]; // the data for one day in the forecast

            console.log(f);

            var row = $("<tr>");
            var date = new Date(f.time * 1000);
            
            //icon summary
            row.append("<td>" + f.summary + "</td>");
            
            // date
            row.append("<td>" + date.toDateString() + "</td>");

            //high
            row.append("<td class='temp'>" + Math.round(f.temperatureMax) + "&deg;C</td>");

            //low
            row.append("<td class='temp'>" + Math.round(f.temperatureMin) + "&deg;C</td>");

            //summary
            row.append("<td>" + f.summary + "</td>");
            

            //wind
            row.append("<td>" + Math.round(f.windSpeed *3.6) + "km/h </td>")

            //rain
            row.append("<td class='temp'>" + Math.round(f.precipProbability *100) + "%</td>");


            //append the tr info to the table
            $("#forecast").append(row);

        } // close loop


    }); //close getJSON
}