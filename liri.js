norequire("dotenv").config();
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment");
var omdb = require('omdb');


var spotify = new Spotify(keys.spotify);


var person1 = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
var myMovie = "";
var artist = "";

if (person1 == "spotify-this") {
    spotify.search(
        {
            type: "track",
            query: userInput
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            } else

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

} else if (person1 === "movie-this") {

    for (i = 3; i < process.argv.length; i++) {
        myMovie += process.argv[i] + "%20";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + myMovie + "&y=&plot=short&apikey=trilogy";


    console.log(myMovie);

    axios.get(queryUrl).then(
        function (response) {

            var short = response.data;

            console.log("================================================");
            console.log("The movie's rating is: " + short.imdbRating);
            console.log("The movie year is " + short.Year);
            console.log("The movie release date is " + short.Released);
            console.log("The Actors in the film are " + short.Actors);
            console.log("The title of this movie is " + short.Title);
            console.log("The movie country is " + short.Country);
            console.log("The language is " +short.Language);
            console.log("The actors in this movie are " + short.Actors);
            console.log("The plot of this movie is : " + short.Plot);
            console.log("================================================");
            // console.log(response);


            fs.appendFile("sample.txt", + short.Title, function (err) {

                // If an error was experienced we will log it.
                if (err) {
                    console.log(err);
                } else  {
                    console.log("Content Added!");
                } 

            });
        }


    );
} else if (person1==="concert-this") {



    var myUrl =  "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    console.log(userInput);

    axios.get(myUrl).then(function(response) {
        // console.log(response.data[0]);
        console.log("================================================");
        console.log("Venue location " + response.data[0].venue.country);
        console.log("Venue name " + response.data[0].venue.name);
        console.log("Datetime " + response.data[0.].datetime);
       
        console.log("================================================");
    }
    
    ) 
} 
    