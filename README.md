# Major League Soccer Stadium Finder

This is my project for the Udacity Nanodegree Neighbourhood Map.

I use several features of the Google MAP API and open weather data from OpenWeathermap.org for this app. The user will see a Map with all 22 MLS teams. You can filter teams for western and eastern conference. You can perform live search on the list of teams. If you click on a team a popupwindow will appear with useful information on the stadium. The app will use OpenWeatherMap API to show the current temperature and overall weather around the stadium. 

### Installation

To run the project locally:

* Download or clone this [this repository](https://github.com/Anskiere1974/MLSStadiumFinder).
* Install [node.js](https://nodejs.org/en/) on your computer, in case you haven't.
* Install [Gulp](http://gulpjs.com/). For more information use [this Guide](https://css-tricks.com/gulp-for-beginners/)
* Install the following Gulp Plugins for this project:
  * [Gulp Uglify](https://www.npmjs.com/package/gulp-uglify)
  * [Gulp Clean CSS](https://www.npmjs.com/package/gulp-clean-css)
  * [Gulp htmlmin](https://www.npmjs.com/package/gulp-htmlmin)
  * [Gulp imagemin](https://www.npmjs.com/package/gulp-imagemin)
* The development code can be found in the __src__ folder. When you make changes to this code, you have to run the __gulp__ command. The code will be processed and written to the __dist__ folder.
* Finally open __dist/index.html__ in your web browser.

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

[19+ JS Shorthand Techniques](https://www.sitepoint.com/shorthand-javascript-techniques/)

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

__Commit dce55cb styling sidebar__

* added a new google map style
* changed the hamburger icon for responsive sidebar
* more styling on the sidebar

__Commit 655091b final touches__

* styling infowindow
* error fallbacks on APIs
* prettify HTML, CSS, JS
* run JSHINT on code.
* more work on documentation

__Commit 4ceebc4 more work__

* solved Required: wrote a section about Gulp and Gulp installation in the Readme

* solved Suggestion: These properties don't need to be *observable* since there's no need for the `ViewModel` to watch for their value changes and update the DOM.

* solved Suggestion: Code Quality Improper Class naming style.

* solved Tip: One UX feature we can consider is to center marker when its active on `click` to provide better UX.

* solved Suggestion Sanity Check: To be safe, please provide conditional statements to handle the case when the each property of the response data is falsy (`undefined`, `null`, empty, etc.). A simple warning message, such as *data is not available*, can be logged to the UI.

* solved Tip: Shorthand Coding Techniques - line 183, 184

* solved Suggestion: It's recommended that we separate JSON data into a file. A quick method is to create a separate JS file and request it before this JS file so that it can access the JSON data.

* solved Suggestion: Code Quality **Udacity Style Guide: **Do not close self-closing elements, ie. write `<br>`, not `<br />`.

  ​

  ​

  ​       