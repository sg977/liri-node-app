//using dotenv to hide keys 
require("dotenv").config();

//declare global variables 
var keys = require('./keys');
var fs = require('fs');
var request = require ('request');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);


//store all comments to arguments 
var command = process.argv[2];
var nodeArgv = process.argv; 

//movie or song input 
var input = "";

//attach multiple words arguments 
for (var i=3; i<nodeArgv.length; i++){
    if (i>3 && i<nodeArgv.length){
        input = input + "+" + nodeArgv[i];
    } else {
        input = input + nodeArgv[i];
    }
    }




//node liri.js my-tweets: this will show your last 20 tweets and when they were created at in your terminal/bash window
//node liri.js spotify-this-song '<song name here>': #1 artist, the song's name, a preview link of the song from Spotify, the album that songs from #2if no song is provided then your program will default to "The Sign by Ace of Base"
//node liri.js movie-this '<movie name here>':#1 title of the movie, year the movie, IMDB rating of the movie, rotten tomatoes rating of the movie, country where the movie was produced, language of the movie, plot of the movie, actors in the movie #2 if the user doest type a movie in, the program will output data fro the movie 'Mr.Nobody'
//node liri.js do-what-it-says: it should run spotify-this-song for "I Want it That Way", as follows the text in random text


//using switch to change comments 
switch (command) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    if (input){
        spotifyThisSong(input);
    } else {
        spotifyThisSong("Fluprescent Adolescent");
    }
    break;

    case "movie-this":
    if (input){
        movieThis(input); 
    } else {
        movieThis("Mr.Nobody")
    }

    break;

    case "do-waht-it-says":
    doWhatItSays();
    break;

    //instructions for first-time user looking around on the commend line
    default: 
    console.log("\n"+ "type commend after 'node liri.js': " + "\n" +
    "my-tweets"+ "\n" +
    "spoty-this-song 'any song title' " + "\n" +
    "movie-this 'any movie title' " + "\n" +
    "do-what-it-says " + "\n" + "use quptes for multiword titles!"); 
    break; 
}

//tweeter npm package 
function myTweets(){
    //display last 20 tweets 
    var params = {screen_name: 'CocoGuo5'};
    client.get('statuses/user_timeline',params, function(error, tweets, response){
        if(!error) {
            for (var i=0; i<tweets.length; i++) {
                var date = tweets[i].created_at;
                //console.log(tweets[i].text); 
                
                console.log("@CocoGuo5: " + tweets[i].text + " Created At: " + date.substring(0,19));
                console.log("------------------------------------------");

                //adds text to log.txt file
                fs.appendFile('log.txt', "@CocoGuo5: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                fs.appendFile('log.txt', "-----------------------");
            };
        } else {
            console.log("Error occured");
           // return; 
        }
    } );
}

//node-spotify-api
function spotifyThisSong(song){
    spotify.search({type:'track', query: song}, function(error, data){
        console.log(data);
        // if(!error){
        //     for(var i=0; i<data.tracks.items.length;i++){
        //         var songData = data.track.items[i];
        //         console.log(songData); 
        //         //artist
        //         console.log("Artist: " + songData.artists[0].name);
        //         //song name
        //         console.log("Song: " + songData.name);
        //         //spotify preview link
        //         console.log("Preview URL: " + songData.preview_url);
        //         //album name 
        //         console.log("Album: " + songData.album.name);
        //         cosnole.log("--------------------------------");
        //          //adds text to log.txt
        //         fs.appendFile('log.txt', songData.artists[0].name);
        //         fs.appendFile('log.txt', songData.name);
        //         fs.appendFile('log.txt', songData.preview_url);
        //         fs.appendFile('log.txt', songData.album.name);
        //         fs.appendFile('log.txt', "-----------------------");              

        //     }
        // } else {
        //     console.log('Error occurred.'); 
        // }
    });
}

