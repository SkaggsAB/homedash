Template.weather.onCreated(function(){
  this.subscribe("commutes");
});


Template.traffic.helpers({

  driver : function () {
    var commutes = Commute.find();
    return commutes;
  }
});
