angular.module('fourcastIoAngularAppApp')
	.constant('GOOGLEGEOCODE',{
		"APIKEY":"AIzaSyBDi56DVodoH92MNTpQfcPtloDx0y8CgY8",
		"MAPOPTIONS":{
        zoom: 12,                     // hostel based on what user has typed in
        center: {lat:51.4147407, lng:-0.7000339999999999}
      }
	})
	.constant('WEATHERIO',{
		"APIKEY":"f271ac1c5ceccc30508c42ee76ddb21b"
	})

  .controller('WeatherIoCtrl',['$scope','$http','GOOGLEGEOCODE','WEATHERIO', function($scope,$http,GOOGLEGEOCODE,WEATHERIO) {
  	$scope.savedLocations = [
  		{postCode:"SL58HZ"}
		]
		$scope.currentWeather = []
		$scope.submitRequest=function(){
			var query = {postCode:$scope.postCode}
			$scope.savedLocations.push(query);
			$scope.geocodeLocation(query.postCode);
		}
		$scope.getLocation = function(){
			if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
      function showPosition(position) {
    		$scope.getWeather(position.coords.latitude,position.coords.longitude)
			}
		}
  	$scope.geocodeLocation=function(postCode){
			$http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+postCode+"&sensor=false&key="+GOOGLEGEOCODE.APIKEY).success(function(data){
				var resultLat = data.results[0].geometry.location.lat;
				var resultLng = data.results[0].geometry.location.lng;
				map_container = document.getElementById('locationMap');
				// $scope.initalizeMap = function(){
				// 	var mapOptions = {
    		//    center: { lat: resultLat, lng: resultLng},
    		//    zoom: 12
    		//   };
   			//  console.log()
    		//  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    		//   console.log(map)
				// }
				// $scope.initalizeMap()
				if(map_container != undefined){
     		  	window.map = new google.maps.Map(map_container, mapOptions); 
     		  	maphostels(hostels); 
      		}
      	$scope.getWeather(resultLat,resultLng);
			})
  	}
  	$scope.getWeather=function(latPoint,longPoint){
  		console.log("forcat.io request")
  		$http.get("https://api.forecast.io/forecast/"+WEATHERIO.APIKEY+"/"+latPoint+","+longPoint).success(function(data){
  			document.getElementById("headerSummary").innerHTML = data.daily.summary;
  			var sevenDayFourcast=data.daily.data,
  					weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  					increment = 2;
  			angular.forEach(sevenDayFourcast, function(day, key){
					var n = weekDay[increment]
					increment+=1
					if (increment === 7){
						increment = 0
					}
					console.log(n)
  				// make hash, and push data in.
  				// make new date object, and iterate through loop adding 1 day on each one
  				// var weatherTheme = day.icon;
  				// switch(day.icon){
  				// 	case "partly-cloudy-day":
  				// 		day.icon = "partly-cloudy-day"
  				// 	case ""	
  				// }
  				// var averageTempreture = 
  				var savedDay = {
  						cloudCover:day.cloudCover * 100,
							humidity:day.humidity,
							icon:day.icon,
							temperatureMax:day.temperatureMax,
							windBearing:day.windBearing,
							windSpeed:day.windSpeed,
							summary:day.summary,
							weekday:n
  				}
  				$scope.currentWeather.push(savedDay)
  			});
  		})
  		$scope.currentWeather = []
  	}
  }]);