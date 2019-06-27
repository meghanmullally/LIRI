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
var command = process.argv[2].toLowerCase();
var input = process.argv.splice(3).join(' ');

//default movie & song 
var defaultMovie = "Mr. Nobody";
var defaultSong = "The Sign";


//Switch Case to select one of many code blocks to be executed 
switch (command) {
  case "concert-this":
    getConcert(value)

    break;
  case "spotify-this-song":
    if (value === "") {
      value = defaultSong
      console.log("Please input an Artist")
    }
    getSongs(value)
    break;

  case "movie-this":
    //if user input is not added, default to defaultMovie
    if (value === "") {
      value = defaultMovie
      console.log("Please input a Movie")
    }
    getMovies(value)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;

  default:
    break;
}

// CONCERT-THIS : getConcert function 

function getConcert(artist) {
  //axios
  // using get to grab from the URL
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log("Name of the Venue: " + response.data[0].venue.name)
      console.log("Location: " + response.data[0].venue.city)

      //using MOMENT to format the eventDate 
      var eventDate = moment(response.data[0].datatime).format('MM/DD/YYYY')

      console.log("Date of Event: " + eventDate);

      // console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });

}


// Spotify-this-song : getSongs function 

function getSongs(songName) {

  // if user hasn't put in a song, put in the defaultSong 
  if (songName === "") {
    //this is the default song 
    songName = "The sign";
  }

  // searching in spotify 

  spotify.search({
    type: 'track',
    query: 'songName',
    limit: 20
  }, function (error, data) {
    if (error) {
      return console.log('Error occurred:' + error);
    }

    // the Artist(s)
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
    //The song's name
    console.log("Song:" + data.tracks.items[0].name)
    // A preview link of the song from Spotify
    console.log("Preview Link:" + data.tracks.item[0].preview_url)
    // The album that the song is from
    console.log("Album:" + data.tracks.items[0].album.name)


  });
};



// MOVE-THIS : function getMovies 

function getMovies(movieName) {
  axios.get("http://www.imdb.com/title/tt0485947/" + movieName)
    .then(function (response) {
      //console.log(response.data)

      var results = ` 
        Title of the movie: ${response.data.Title}
        Year the movie came out: ${response.data.Year}
        IMDB Rating of the movie: ${response.data.Rated}
        Rotten Tomatoes Rating of the movie: ${response.data.Rating[1].value}
        Country where the movie was produced: ${response.data.Country}
        Language of the movie: ${response.data.Language}
        Plot of the movie: ${response.data.Plot}
        Actors in the movie: ${response.data.Actors}`;

      console.log(results);

    }).catch(function (error) {
      console.log(error);
    });

  // if there isn't an user input : defaultMovie
  if (movieName === "Mr.Nobody") {
    console.log("-------------")
    console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  };

}

// do-what-it-says