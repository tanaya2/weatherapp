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
        console.log(data);


        //create new date object
        var now = new Date(data.currently.time * 1000);

        var time = $("<h1>").text("At: " + moment(date).format('dddd, Do MMMM') + ", " + moment(date).format('h:mm a'));

        //add icon image to HTML
        //set variable to be a function
        var iconImage = returnIcon(data.currently.icon);
        var currentIcon = $('<div>').html('<img src="' + iconImage + '">').addClass('icon');
        $("#currently").append(currentIcon);

        //get current temp
        var currently = $("<h1>").html (" " + Math.round (data.currently.temperature) + "&deg;C");
        //add it to body
        $("#currently").append(currently);
        

        //loop through the data and add it the table
        //new row for each new item

        for (var i = 0; i < data.daily.data.length; i++) {
            var f = data.daily.data[i]; // the data for one day in the forecast

            console.log('in daily forecast. Length: ' + data.daily.data.length);

            var row = $("<tr>");
            var date = new Date(f.time * 1000);
            
            //create image using function 
            var icon = '<img src="' + returnIcon(f.icon) + '">';
            //now add that image
            row.append("<td>" + icon + "</td>")
            
            //date
            row.append("<td>" + moment(date).format('dddd, Do MMMM') + "</td>");
            
            //low temperature
            row.append("<td class='temp'>" + Math.round(f.temperatureMin) + "&deg;C</td>");

            //high temperature
            row.append("<td class='temp'>" + Math.round(f.temperatureMax) + "&deg;C</td>");

            //summary
            row.append("<td>" + f.summary + "</td>");

            //wind
            row.append("<td>" + Math.round(f.windSpeed *3.6) + "km/h </td>")

            //chance of rain
            row.append("<td class='temp'>" + Math.round(f.precipProbability *100) + "%</td>");

            //append the tr info to the table
            $("#daily-forecast-table").append(row);

        } // close loop


        //hourly forecast
        for (var i = 0; i < data.hourly.data.length; i++) {
            var f = data.hourly.data[i]; // the data for one hour in the forecast

            console.log('in hourly forecast. Length: ' + data.hourly.data.length);
            
            var row = $("<tr>");
            var date = new Date(f.time * 1000);
            
            //create image using function
            var icon = '<img src="' + returnIcon(f.icon) + '">';
            row.append("<td>" + icon + "</td>")

            // date
            row.append("<td>" + moment(date).format('h:mm a') + "</td>");

            //temperature
            row.append("<td class='temp'>" + Math.round(f.temperature) + "&deg;C </td>");

            //summary
            row.append("<td>" + f.summary + "</td>");

            //feels like temperature 
            row.append("<td>" + Math.round(f.apparentTemperature) + "&deg;C </td>")

            //wind
            row.append("<td>" + Math.round(f.windSpeed *3.6) +"km/h </td>")

            //chance of rain
            row.append("<td>" + Math.round(f.precipProbability *100) + "% </td>")

            //append the tr info to the table
            $("#hourly-forecast-table").append(row);      

        } // close loop


    }); //close getJSON
}


//function to run in order to return icon image
function returnIcon(icon) {

    //setup icons
    // find icon files
    var sunIcon = 'images/sun.svg';
    var moonIcon = 'images/Moon.svg';
    var cloudSunIcon = 'images/Cloud-Sun.svg';
    var cloudMoonIcon = 'images/Cloud-Moon.svg';
    var cloudyIcon = 'images/Cloud.svg';
    var rainIcon = 'images/Cloud-Rain.svg';
    var snowIcon = 'images/Cloud-Snow.svg';
    var sleetIcon = 'images/Cloud-Hail.svg';
    var windIcon = 'images/Cloud-Wind.svg';
    var fogIcon = 'images/Cloud-Fog.svg';

    //if statement 
    if (icon === 'clear-day') {
        iconImage = sunIcon;
    } else if (icon === 'cloudy') {
        iconImage = cloudyIcon;
    } else if (icon === 'rain') {
        iconImage = rainIcon;
    } else if (icon === 'clear-night') {
        iconImage = moonIcon;
    } else if (icon === 'partly-cloudy-night') {
        iconImage = cloudMoonIcon;
    } else if (icon === 'partly-cloudy-day') {
        iconImage = cloudSunIcon;
    } else if (icon === 'snow') {
        iconImage = coldIcon;
    } else if (icon === 'wind') {
        iconImage = windyIcon;
    }

    return iconImage;
}
