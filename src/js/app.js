// App.js

// Team is a constructor function for building new - knockout.js ready - teams
var Teams = function(data) {
    this.name = ko.observable(data.name);
    this.stadium = ko.observable(data.stadium);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.conference = ko.observable(data.conference);
    this.visible = ko.observable(true);
};

// starting appViewModel
var appViewModel = function() {
    // sometimes a little hack is all you need
    var self = this;
    this.query = ko.observable('');
    this.teamList = ko.observableArray([]);

    // will do all the live search stuff in the search field
    this.liveSearch = function(value) {
        self.teamList().forEach(function(item) {
            if (item.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
                item.visible(true);
                item.marker.setVisible(true)
            } else {
                item.visible(false);
                item.marker.setVisible(false)
            }
        });
    };

    // takes all teamData and makes a knockout.js ready list
    this.createTeamList = function() {
        for (var i = 0; i < teamData.length; i++) {
            self.teamList.push(new Teams(teamData[i]));
        }
    };

    // basic filter to find the teams in a given conference
    this.filter = function(conference) {
        for (var i = 0; i < teamData.length; i++) {
            if (teamData[i].conference === conference) {
                self.teamList.push(new Teams(teamData[i]));
            }
        }
        self.createMarker();
    };

    // show all teams in western conference
    this.filterWest = function() {
    	self.removeMarker(); // remove all markers
        self.teamList.removeAll(); // clear the teamList
        self.query(''); // clear the search string
        self.filter('west'); // apply the basic filter
    };

    // show all teams in eastern conference
    this.filterEast = function() {
    	self.removeMarker(); // remove all markers
        self.teamList.removeAll(); // clear the teamList
        self.query(''); // clear the search string
        self.filter('east'); // apply the basic filter
    };

    // show all MLS teams
    this.filterAll = function() {
    	self.removeMarker(); // remove all markers
        self.teamList.removeAll(); // clear the teamList
        self.query(''); // clear the search string
        self.createTeamList();
        self.createMarker();
    };

    // crreating markers for the map
    this.createMarker = function() {
    	// looping through the teamlist
    	for(var i = 0; i < self.teamList().length; i++) {
    		var marker = new google.maps.Marker({
            map: self.map,
            position: {lat: self.teamList()[i].lat(), lng: self.teamList()[i].lng()},
            title: self.teamList()[i].name(),
            animation: google.maps.Animation.DROP,
          });

    		// add click event to every marker
    		marker.addListener('click', function() {
    			self.letsBounce(this);
    			self.populateInfoWindow(this, self.infowindow);
    		});

    		self.teamList()[i].marker = marker;
    	}
    };

    // soemtimes you need to remove a marker
    this.removeMarker = function() {
    	 self.teamList().forEach(function(item) {
            item.marker.setMap(null);
        });
    };

    // the markers learn to bounce
    this.letsBounce = function(marker) {
    	marker.setAnimation(google.maps.Animation.BOUNCE);
    	// all good things come to an end
    	setTimeout(function(){
    		marker.setAnimation(null);
    	}, 1400);
    };

    // Making our teams clickable and interactive with the marker
    this.handleMarker = function() {
    	self.letsBounce(this.marker);
    	self.populateInfoWindow(this.marker, self.infowindow);
    };

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    this.infowindow;
    this.populateInfoWindow = function(marker, infowindow) {
    	if (infowindow.marker != marker) {
    		infowindow.marker = marker;
    		infowindow.setContent('<div>' + marker.title + '</div>');
    		infowindow.open(map, marker);
    		// Make sure the marker property is cleared if the infowindow is closed.
          	infowindow.addListener('closeclick',function(){
            	infowindow.setMarker = null;
          	});
    	}
    };

    this.map;
    this.initMap = function() {
        var mapOptions = {
            center: { lat: 37.8, lng: -101.5 }, // centering on the US
            zoom: 5,
            mapTypeControl: false, // deactivates the mapTypeControl Panel
            streetViewControl: false // deactivates the streetViewControl Panel
        };

        self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        self.infowindow = new google.maps.InfoWindow();
    }

   
    this.initMap();
    this.createTeamList();
    this.createMarker();
};

// Callback function for Google Map API to start the show
var init = function() {
    ko.applyBindings(new appViewModel());
};

// handling the Sidebar
$(document).ready(function() {
    $('#sidebar-btn').on('click', function() {
        $('#sidebar').toggleClass('visible');
    });

});
