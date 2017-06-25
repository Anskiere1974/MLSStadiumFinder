# Major League Soccer Stadium Finder

_a note about OpenWeatherMap_
For this project I used a free version of openweatherMap API. There are some restrictions to this free service. Free and Startup accounts have limitation of capacity and data availability. If you do not get respond from server do not try to repeat your request immediately, but only after 10 min.

### Resources

[Gulp.js](http://www.gulp.js.com)
[Materialize.css](http://materializecss.com/)
[JQuery](https://jquery.com/)
[Knockout.js](http://knockoutjs.com/)
[Google Map API]()
[Openweathermap.org](http://openweathermap.org/)

### Helpful articles and tutorials

[CSS-Tricks Gulp for Beginners](https://css-tricks.com/gulp-for-beginners/)

[Documentation of OpenWeatherMapAPI](http://openweathermap.org/api)

### Version Control

__Commit b7954d8 Gulp Workflow__

* Setting up basic file structure (dist,src)
* Implementing gulpfile.js
* Testing gulp and gulp watch
* implementing .gitignore to lock out node_modules
* starting documentation in README.md

__Commit 009f843 Basic index.html__

* Setting up basic index.html importing materialize.css, Google Fonts, JQuery and Knockout.js
* updating documentation

__Commit 7368849 Basic style.css__

* Setting up basic style.css
* updating documentation

__Commit f509bb3 Basic Map__

* implementing basic Google Map
* [more about Map Controls](https://developers.google.com/maps/documentation/javascript/controls)
* updating documentation

__Commit 15afe6d Basic sidebar__

* implementing basic responsive sidebar
* setting up basic knockout.js appViewModel
* updating documentation

__Commit bc740ab Import teamdata.js import teamdata.js__

* var teamData is an object literal holding the basic data for all MLS teams.
* updating documentation

__Commit 476ca4d Basic live Search__

* add createTeamlist()
* add liveSearch()

__Commit 6d54014 Filter for conference__

+ add filter(), filterWest(), filterEast(), filterAll()
  now you can filter the teams for western and eastern conference.

__Commit 6e22285 add Markers__

* add createMarker(), removeMarker(), more work on the filter functions
  Now markers will appear on the Map. The markers will update themselves accordingly to the selected conference or live search input.

__Commit adec927 add clicks__

* add listening events to the markers and to the teamList. The markers will start to bounce after being clicked.

__Commit d71e19c add basic infowindow__

* add populateInfoWindow()
  After clicking a team in the teamList or a marker on the map, an infowindow with more information will pop up.

__Commit 10ef456 reverse Geocoding__

* getGeocodeAddress() will take the latlng from teamData and use reverse Geocoding to find out the stadium address and display it on the info window.

__Commit 9be2e7f weather and static Map__

* added a small static satellite image of the stadium, when info window opens. This way you get a bird's eye view of the selected stadium.
* added openweathermap.org api to display current weather data.

__Commit 7568f94 team logo__

* added all MLS team logos. The google map API will render the correct team logo for all teams.

__Commit 00000 new style__

* added a new google map style
* changed the hamburger icon for responsive sidebar
* more styling on the sidebar