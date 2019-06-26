require("dotenv").config();


var request = require("request");

// grabs keys 
var keys = require("./keys.js");

//command and input 
var command = process.argv[2];
var input = process.argv[3];



// Spotify &  moment 
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
// moment 
var moment = require('moment')

var fs = require('fs')

// Spotify song commands 

function spotifySong(song) {
  if (song === null) {
    song = ''
  }
}

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says