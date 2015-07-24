Meteor.publish("commutes", function(){
  return Commute.find();
});

function getCommutes(){
  //Commute.remove({});
  var commuters = People.find({ drives : true });
  commuters.forEach(function (driver){
    var homeaddr = Locations.findOne({name : "Home"});
    var workaddr = Locations.findOne({name : driver.work})
    var work = workaddr.street1 +" "+ workaddr.city + " " + workaddr.state + " " + workaddr.zip;
    var home = homeaddr.street1 +" "+ homeaddr.city + " " + homeaddr.state + " " + homeaddr.zip;

    var url = "https://www.mapquestapi.com/directions/v2/route";
    var resultsraw = Meteor.http.get(url, {params: {from: home, to: work, key: APIKeys.findOne({name : "mapquest"}).key}});

    if (resultsraw.statusCode === 200) {
      var directions = JSON.parse(resultsraw.content);
      Commute.upsert( {name: driver.name }, {name: driver.name, iconcolor: driver.iconcolor, realtime: directions.route.realTime, time: (Math.floor(directions.route.realTime/60) + 1) + " Mins" , desc: directions.route.legs[0].origNarrative, updated: new Date() });
    } else {
      console.log("ERROR: Unable to retreive directions - Code " + resultsraw.statusCode)
    }
  })
}



Meteor.startup(function() {
  SyncedCron.add({
   name: 'CommuteCalc',
   schedule: function(parser){
     return parser.text('every 15 minutes');
   },
   job: function() {
     var commutes = getCommutes();
     return commutes;
   }
  });
  getCommutes();
});
