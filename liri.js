require("dotenv").config();
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment");
var omdb = require('omdb');


var spotify = new Spotify(keys.spotify);




var person1 = process.argv[2];
var yourSong = process.argv[3];

if (process.argv[2] == "spotify-this") {
    spotify.search(
        {
            type: "track",
            query: yourSong
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};



var queryUrl = "http://www.omdbapi.com/?t=" + myMovie + "&y=&plot=short&apikey=trilogy";
var name = process.argv[2];
var myMovie = "";


if (name == "movie-this") {

    for (i = 2; i < process.argv.length; i++) {
        myMovie += process.argv[i] + "%20";
    }
 
  
    // // ...

    console.log(myMovie);

    axios.get(queryUrl).then(
        function (response) {

            var short = response.data;

            console.log("The movie's rating is: " + short.imdbRating);
            console.log("The movie year is " +short.Year);
            console.log("The movie release date is " + short.Released);
            console.log("The Actors in the film are " + short.Actors);
            console.log("The title of this movie is " + response.Title);
            console.log(response);


            fs.appendFile("sample.txt", "," + response.data.Title, function (err) {

                // If an error was experienced we will log it.
                if (err) {
                    console.log(err);
                } else {
                    console.log("Content Added!");
                }

            });
        }


    );





}

