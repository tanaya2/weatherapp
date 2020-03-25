script src="https://code.jquery.com/jquery-3.2.1.min.js"   integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="   crossorigin="anonymous"></script>

        <script type="text/javascript">
            $(document).ready(function(){
                
            var newLocation = '';
                
            if (navigator.geolocation) {
            console.log(navigator.geolocation);
                    
                function success(pos) {
                console.log(pos);
                    
                    var crds = pos.coords;
                    console.log('my current position is: ');
                    console.log('lat: ' + crds.latitude);
                    console.log('long:' + crds.longitude);
                    console.log('more or less:' + crds.accuracy + 'm away.');
                        
                //set string for data for dark sky api based on their format
                        
                newlocation = crds.latitude + ',' + crds.longitude;
                        
                        //this will set the string to retrive location based on open sky formate
                        var latlongName = crds.latitude + '+' + crds.longitude;
                        
                        //run function to get weather data from api
                        getWeatherData(newLocation);
                        
                        //function to get location name
                        getLocationName(latlongName);
                        
                }
                    
                function error(err) {
                console.log(err);
                        
                    //default location is canberra
                    var defaultLocation = '-35.28346,1249.12807';
                        
                    getWeatherData(newLocation);
                }
           
                //this is the line that triggers the browser prompt
                navigator.geolocation.getCurrentPosition(success, error);
                    
                }

    });//close document ready
            
    //get location name
            
        function getLocationName(latlngCoords) {
        
            var apiKey = 'c89f5a299176437ea002fecc8d8b544b'; 
            
            var geocodeUrl = 'http://api.opencagedata.com/geocode/v1/json?q=' + latlngCoords + '&key=' + apiKey; 
                
                $.get(geocodeUrl, function(locationData) {
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
                
                //set default location - canberra
                var defaultLocation = '-35.28346,149.12807';

                //api call
                var url = 'https://api.darksky.net/forecast/80fa44f25c6d60fb504e7a003ddd88ad/-35.28346,149.12807?units=auto'
                $.get(url, function(data) {

                    
                    //create new date object
                    var now = new Date(data.currently.time*1000);
                    //get date and display
                    var time = $("<h1>").text("At: " + now.toDateString() + ", " + now.toTimeString() );
                    //add to body
                    $("#currently").append(time);

                    //get current temp
                    var currently = $("<h2>").html("Currently: " + data.currently.temperature + "&deg;C");
                    //add it to body
                    $("#currently").append(currently);
                    
                    //get daily low
                    var temperatureMin = $("<h2>").html("Low: " + data.daily.temperatureMin + "&deg;C");
                    $("#daily").append(temperatureMin);
                    
                    //get daily high
                    var temperatureHigh = $("<h2>").html("High: " + data.currently.temperatureHigh + "&deg;C");
                    $("#currently").append(temperatureHigh);
                    
                    //get the summary from API
                    var summary = $("<h2>").text("Summary: " + data.currently.summary);
                    //add it to body
                    $("#currently").append(summary);
                    
                    //get apparent temperature
                    var apparentTemperature = $("<h2>").html("Apparent Temperature: " + data.currently.apparentTemperature + "&deg;C");
                    $("#currently").append(apparentTemperature);
                    
                    //get wind speed
                     var windSpeed = $("<h2>").text("Wind Speed: " + data.currently.windSpeed*3.6 + "km/h");
                    $("#currently").append(windSpeed);
                    
                    //Math.round(data.currently.windSpeed * 3.6) + " km/h";
                                    
                    
                    //get precipiation chance
                    var precipProbability = $("<h2>").text("Chance of Rain: " + data.currently.precipProbability*100 + "%" );
                    $("#currently").append(precipProbability);

                    
                   

                    //loop through the data and add it the table
                    //new row for each new item

                    for (var i = 0; i < data.daily.data.length; i++) {
                        var f = data.daily.data[i];// the data for one day in the forecast

                        console.log(f);

                        var row = $("<tr>");
                        var date = new Date(f.time*1000);
                        // date
                        row.append("<td>" + date.toDateString() + "</td>");
                        
                        //current
                        
                        
                        //high
                        row.append("<td class='temp'>" + Math.round(f.temperatureMax) + "&deg;C</td>");
                        
                        //low
                        row.append("<td class='temp'>" + Math.round(f.temperatureMin) + "&deg;C</td>");
                        
                        //summary
                        row.append("<td>" + f.summary + "</td>");
                        
                        //feelslike
                        row.append("<td>" + f.apparentTemperature + "</td>")
                        
                        //wind
                        row.append("<td>" + f.windSpeed + "</td>")
                        
                        //rain

                        

                        //append the tr info to the table
                        $("#forecast").append(row);

                    }



                });
            }
</body>
        </script>