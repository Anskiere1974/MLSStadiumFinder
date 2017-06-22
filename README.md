# Major League Soccer Stadium Finder



### Resources

[Gulp.js](http://www.gulp.js.com)
[Materialize.css](http://materializecss.com/)
[JQuery](https://jquery.com/)
[Knockout.js](http://knockoutjs.com/)
[Google Map API]()

### Helpful articles and tutorials

[CSS-Tricks Gulp for Beginners](https://css-tricks.com/gulp-for-beginners/)

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

__Commit 00000 add clicks__

* add listening events to the markers and to the teamList. The markers will start to bounce after being clicked.