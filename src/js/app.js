// App.js

// starting appViewModel
var appViewModel = function() {
	// sometimes a little hack is all you need
	var self = this;
	
	this.map;
	this.initMap = function() {
		var mapOptions = {
			center: {lat: 37.8, lng: -101.5}, // centering on the US
			zoom: 5,
			mapTypeControl: false, // deactivates the mapTypeControl Panel
			streetViewControl: false // deactivates the streetViewControl Panel
		};
		self.map = new google.maps.Map(document.getElementById('map'),mapOptions);
	}

	this.initMap();
};

// Callback function for Google Map API to start the show
var init = function() {
	ko.applyBindings(new appViewModel());
};


