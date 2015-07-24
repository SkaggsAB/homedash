Template.trash.onCreated(function(){
  this.subscribe("days");
});



Template.trash.helpers({

  heavytrashday : function () {
    return {soon: false, timeleft: "2 days"};
  },

  planttrashday : function () {
    return {soon: false, timeleft: "2 days"};
  },


  trashday : function () {
    return {soon: true};
  },

  recycleday : function () {
    return {soon: true};
  }

});
