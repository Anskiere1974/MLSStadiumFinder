// App.js

// Team is a constructor function for building new - knockout.js ready - teams
var Teams = function(data) {
    this.name = data.name;
    this.stadium = data.stadium;
    this.capacity = data.capacity;
    this.lat = data.lat;
    this.lng = data.lng;
    this.conference = data.conference;
    this.visible = true;
    this.address = data.address;
};

// starting AppViewModel
var AppViewModel = function() {
    // sometimes a little hack is all you need
    var self = this;
    this.query = ko.observable('');
    this.teamList = ko.observableArray([]);

    // will do all the live search stuff in the search field
    this.liveSearch = function(value) {
        self.teamList().forEach(function(item) {
            if (item.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
                item.visible = true;
                item.marker.setVisible(true);
            } else {
                item.visible = false;
                item.marker.setVisible(false);
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
        for (var i = 0; i < self.teamList().length; i++) {

            // Finding the right logo for the right team
            var teamName = self.teamList()[i].name; // First we need the current teamName
            teamName = teamName.toLowerCase(); // all lower Case is needed
            teamName = teamName.replace(/\./g, ''); // erase all . from the teamName like in D.C. United
            teamName = teamName.replace(/ /g, ''); // erase all whitespaces
            var image = 'images/' + teamName + '.png'; // now we build the url path

            var marker = new google.maps.Marker({
                map: self.map,
                icon: {
                    url: image,
                    size: new google.maps.Size(32, 32),
                    // The anchor for this image is the base of the bottom middle at (16, 32).
                    anchor: new google.maps.Point(16, 32)
                },
                position: { lat: self.teamList()[i].lat, lng: self.teamList()[i].lng },
                title: self.teamList()[i].name,
                stadium: self.teamList()[i].stadium,
                capacity: self.teamList()[i].capacity,
                animation: google.maps.Animation.DROP,
                address: teamData[i].address
            });

            // add click event to every marker
            marker.addListener('click', self.markerClick);

            self.teamList()[i].marker = marker;
        }
    };

    this.markerClick = function() {
        self.letsBounce(this);
        self.getGeocodeAddress(this);
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
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1400);
    };

    // Making our teams clickable and interactive with the marker
    this.handleMarker = function() {
        self.letsBounce(this.marker);
        self.getGeocodeAddress(this.marker);
        self.map.setCenter(this.marker.getPosition());
    };

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent(
                '<div class="marker-title">' + marker.title + '</div>' +
                '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + marker.position.lat() + ',' + marker.position.lng() + '&zoom=16&size=200x200&maptype=hybrid&key=AIzaSyCKRKYTqc_igfzoYRi0-fgyKDm21AVU_yU" alt="" />' +
                '<div>' + marker.stadium + '</div>' +
                '<div>' + marker.address + '</div>' +
                '<div>capacity: ' + marker.capacity + '</div>' +
                '<div>weather: ' + marker.weather + '</div>' +
                '<div>temperature: ' + marker.temp + 'Celsius</div>'
            );
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.setMarker = null;
            });
        }
    };

    // use reverse Geocoding to find out the stadiums address
    this.getGeocodeAddress = function(marker) {
        var lat = marker.position.lat();
        var lng = marker.position.lng();

        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCKRKYTqc_igfzoYRi0-fgyKDm21AVU_yU',
            success: function(data) {
                var output = data.results[0].formatted_address;
                marker.address = output;
                self.getWeather(marker);
            },
            error: function() {
                alert("Unable to reach GoogleMap Geocoding - please try again later");
            }
        });
    };

    // Ask openweathermap.api for the current weather at the selected stadium
    this.getWeather = function(marker) {
        var lat = marker.position.lat(),
            lng = marker.position.lng();

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&APPID=906ae1bd2537be3aefb269cb9a2f068a&units=metric',
            success: function(data) {
                if (data.main.temp !== null || data.main.temp !== undefined || data.main.temp !== '') {
                    marker.temp = data.main.temp;
                } else {
                    marker.temp = "currently unavailable";
                }

                if (data.weather[0].description !== null || data.weather[0].description !== undefined || data.weather[0].description !== '') {
                    marker.weather = data.weather[0].description;
                } else {
                    marker.weather = "currently unavailable";
                }
                self.populateInfoWindow(marker, self.infowindow);
            },
            error: function() {
                alert("Unable to reach Openweathermap.org - please try again later");
            }
        });
    };

    this.initMap = function() {
        var mapOptions = {
            center: { lat: 37.8, lng: -101.5 }, // centering on the US
            zoom: 5,
            mapTypeControl: false, // deactivates the mapTypeControl Panel
            streetViewControl: false, // deactivates the streetViewControl Panel
            zoomControl: false,
            fullscreenControl: false,
            styles: mapStyle // loading Mapstyle per js - other option would be to import via ajax call an json file
        };

        self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        self.infowindow = new google.maps.InfoWindow();
    };

    this.initMap();
    this.createTeamList();
    this.createMarker();
};

// Callback function for Google Map API to start the show
var init = function() {
    ko.applyBindings(new AppViewModel());
};

function mapError() {
    alert('Sorry we have a problem loading the Google Map. Drink a cup of coffee and retry later.');
}

// handling the Sidebar
$(document).ready(function() {
    $('#sidebar-btn').on('click', function() {
        $('#sidebar').toggleClass('visible');
    });
});
