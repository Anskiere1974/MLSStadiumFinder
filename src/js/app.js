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
            } else {
                item.visible(false);
            }
        });
    };

    // takes all teamData and makes a knockout.js ready list
    this.createTeamList = function() {
        for (var i = 0; i < teamData.length; i++) {
            self.teamList.push(new Teams(teamData[i]));
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
    }

    this.createTeamList();
    this.initMap();
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
