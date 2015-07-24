Meteor.publish("wx", function(){
  return Weather.find();
});
Meteor.publish("astro", function(){
  return Astro.find();
});
Meteor.publish("locations", function(){
  Locations.find();
})

function getWxConditions(){
    var apikey = APIKeys.findOne({name : "wunderground"});
    var zip =  Locations.findOne({name : "Home"}).zip;

    var url = "http://api.wunderground.com/api/" + apikey.key + "/conditions/q/" + zip + ".json";

    var resultsraw = Meteor.http.get(url);
    if (resultsraw.statusCode === 200) {
      var wxu = JSON.parse(resultsraw.content)
      Weather.insert( wxu.current_observation );
    } else {
      console.log("ERROR: Unable to retreive weather - Code " + resultsraw.statusCode);
    }
  };

function getAstro(){
      var apikey = APIKeys.findOne({name : "wunderground"});
      var zip =  Locations.findOne({name : "Home"}).zip;

      var url = "http://api.wunderground.com/api/" + apikey.key + "/astronomy/q/" + zip + ".json";

      var resultsraw = Meteor.http.get(url);
      if (resultsraw.statusCode === 200) {
        var astro = JSON.parse(resultsraw.content);
        Astro.upsert({zip: zip},{zip: zip , data: astro });
      } else {
        console.log("ERROR: Unable to retreive astro - Code " + resultsraw.statusCode);
      }
    };

Meteor.startup(function() {
    Weather.remove({});
    Astro.remove({});
    getAstro();
    getWxConditions();

    SyncedCron.add({
     name: 'WxConditions',
     schedule: function(parser){
       return parser.text('every 15 minutes');
     },
     job: function() {
       var wxc = getWxConditions();
       return wxc;
     }
   });
});
