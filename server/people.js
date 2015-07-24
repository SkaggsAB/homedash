Meteor.publish("people", function(){ return People.find(); });
Meteor.publish("locations", function(){ return Locations.find(); });

Meteor.startup(function() {
  //Commute.remove({});
});
