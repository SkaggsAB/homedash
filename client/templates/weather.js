Template.weather.onCreated(function(){
  this.subscribe("wx");
  this.subscribe("astro");
  this.subscribe("locations");
});



Template.weather.helpers({

  wx : function (){
    return Weather.findOne({},{sort : {"local_epoch" : -1 }});
  },

  wu2wi : function (icon) {
    var wi;
    var zip = Locations.findOne({name : "Home"}).zip;
    var astro = Astro.findOne({zip : zip});
    var now = new Date();
    if (now.getHours() > astro.data.sun_phase.sunrise.hour && now.getHours() < astro.data.sun_phase.sunset.hour ){
    switch (icon) {
      case "clear":
        wi = "wi-day-sunny";
        break;
      case "cloudy":
      case "mostlycloudy":
      case "partlysunny":
        wi = "wi-day-cloudy";
        break;
      case "partlycloudy":
      case "partlysunny":
        wi = "wi-day-sunny-overcast";
        break;
      case "flurries":
        wi = "wi-day-snow";
        break;
      case "fog":
        wi = "wi-day-fog";
        break;
      case "hazy":
        wi = "wi-windy";
        break;
      case "sleet":
        wi = "wi-day-hail";
        break;
      case "rain":
        wi = "wi-day-rain";
        break;
      case "snow":
        wi = "wi-day-snow";
        break;
      case "rain":
        wi = "wi-day-rain";
        break;
      case "tstorms":
        wi = "wi-day-thuderstorm";
        break;
      }
    } else {
      switch (icon) {
        //NIGHT - requires more magic!
      case "clear":
        wi = "wi-night-clear";
        break;
      case "cloudy":
      case "mostlycloudy":
      case "partlysunny":
        wi = "wi-night-cloudy";
        break;
      case "partlycloudy":
      case "partlysunny":
        wi = "wi-night-sunny-overcast";
        break;
      case "flurries":
        wi = "wi-night-snow";
        break;
      case "fog":
        wi = "wi-night-fog";
        break;
      case "hazy":
        wi = "wi-windy";
        break;
      case "sleet":
        wi = "wi-night-hail";
        break;
      case "rain":
        wi = "wi-night-rain";
        break;
      case "snow":
        wi = "wi-night-snow";
        break;
      case "rain":
        wi = "wi-night-rain";
        break;
      case "tstorms":
        wi = "wi-night-thuderstorm";
        break;

        //Obviously, if we can't find something, fake it!
      default:
      wi =  "wi-meteor";
    }
  }

      return wi;
  }
});
