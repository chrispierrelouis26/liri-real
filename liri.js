require("dotenv").config();
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var axios = require("axios");
require('dotenv').config()

var spotify = new Spotify(keys.spotify);