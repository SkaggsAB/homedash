Meteor.methods({
  'asteriskConnect' : function asteriskConnect() {
    var AsteriskAmi = require('asterisk-ami')
    var apikey = APIKeys.findOne({name: 'asterisk'});
    var ami = new AsteriskAmi( apikey );

   });

