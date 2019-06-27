require("dotenv").config();

// imports code from keys.js and stores it in a variable 
var keys = require("./keys.js");
// Spotify &  moment 
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment')
var fs = require('fs')

//calling axios 
var axios = require("axios");


//command and input 
var command = process.argv[2];
var input = process.argv[3];

//default movie & song 
var defaultMovie = "Mr. Nobody";
var defaultSong = "The Sign";


//Switch Case to select one of many code blocks to be executed 

switch (command) {
  case "concert-this":
    getBands(value)

    break;
  case "spotify-this-song":
    if (value === "") {
      value = defaultSong
    }
    getSongs(value)
    break;

  case "movie-this":
    //if user input is not added, default to defaultMovie
    if (value === "") {
      value = defaultMovie
    }
    getMovies(value)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;

  default:
    break;
}

// CONCERT-THIS : getBands function 

function getBands(artist) {
  //axios
  // using get to grab from the URL
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log("Name of the Venue: " + response.data[0].venue.name)
      console.log("Location: " + response.data[0].venue.city)
      
      //using MOMENT to format the eventDate 
      var eventDate = moment(response.data[0].datatime).format('MM/DD/YYYY')
      
      console.log("Date of Event: " + eventDate)
      
      
      
      // console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });

}




// spotify-this-song

// movie-this

//http://www.imdb.com/title/tt0485947/

// do-what-it-says