var Teams=function(e){this.name=ko.observable(e.name),this.stadium=ko.observable(e.stadium),this.lat=ko.observable(e.lat),this.lng=ko.observable(e.lng),this.conference=ko.observable(e.conference),this.visible=ko.observable(!0)},appViewModel=function(){var e=this;this.query=ko.observable(""),this.teamList=ko.observableArray([]),this.liveSearch=function(t){e.teamList().forEach(function(t){t.name().toLowerCase().indexOf(e.query().toLowerCase())>=0?(t.visible(!0),t.marker.setVisible(!0)):(t.visible(!1),t.marker.setVisible(!1))})},this.createTeamList=function(){for(var t=0;t<teamData.length;t++)e.teamList.push(new Teams(teamData[t]))},this.filter=function(t){for(var a=0;a<teamData.length;a++)teamData[a].conference===t&&e.teamList.push(new Teams(teamData[a]));e.createMarker()},this.filterWest=function(){e.removeMarker(),e.teamList.removeAll(),e.query(""),e.filter("west")},this.filterEast=function(){e.removeMarker(),e.teamList.removeAll(),e.query(""),e.filter("east")},this.filterAll=function(){e.removeMarker(),e.teamList.removeAll(),e.query(""),e.createTeamList(),e.createMarker()},this.markers=[],this.createMarker=function(){for(var t=0;t<e.teamList().length;t++){var a=new google.maps.Marker({map:e.map,position:{lat:e.teamList()[t].lat(),lng:e.teamList()[t].lng()},title:e.teamList()[t].name(),animation:google.maps.Animation.DROP});e.teamList()[t].marker=a}},this.removeMarker=function(){e.teamList().forEach(function(e){e.marker.setMap(null)})},this.map,this.initMap=function(){var t={center:{lat:37.8,lng:-101.5},zoom:5,mapTypeControl:!1,streetViewControl:!1};e.map=new google.maps.Map(document.getElementById("map"),t)},this.initMap(),this.createTeamList(),this.createMarker()},init=function(){ko.applyBindings(new appViewModel)};$(document).ready(function(){$("#sidebar-btn").on("click",function(){$("#sidebar").toggleClass("visible")})});