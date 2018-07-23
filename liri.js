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
    "spotify-this-song 'any song title' " + "\n" +
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
            for(var i=0; i<tweets.length; i++) {
                var date = tweets[i].created_at;
                //console.log(tweets[i].text); 
                
                console.log("@CocoGuo5: " + tweets[i].text + " Created At: " + date.substring(0,19));
                console.log("------------------------------------------");

                //adds text to log.txt file
                fs.appendFile('log.txt', "@CocoGuo5: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                //fs.appendFile('log.txt', "-----------------------");
            };
        } else {
            console.log("Error occured");
           // return; 
        }
    } );
}

//node-spotify-api
function spotifyThisSong(song){
    spotify.search({type:'track', query: input}, function(error, data){
        //console.log(data);
        if(!error){
            for(var i=0; i<data.tracks.items.length;i++){
                var songData = data.tracks.items[i];
                //console.log(songData); 
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song name
                console.log("Song: " + songData.name);
                //spotify preview link
                console.log("Preview URL: " + songData.preview_url);
                //album name 
                console.log("Album: " + songData.album.name);

                cosnole.log("--------------------------------");
                 //adds text to log.txt
                fs.appendFile('log.txt', songData.artists[0].name);
                fs.appendFile('log.txt', songData.name);
                fs.appendFile('log.txt', songData.preview_url);
                fs.appendFile('log.txt', songData.album.name);
                fs.appendFile('log.txt', "-----------------------");              

            }
        } else {
            console.log('Error occurred.'); 
        }
    });
}

function movieThis(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true&apikey=trilogy';
    console.log(omdbURL);
  
    request(omdbURL, function (error, response, body){
      if(!error && response.statusCode == 200){
        var body = JSON.parse(body);
  
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);
  
        //adds text to log.txt
        fs.appendFile('log.txt', "Title: " + body.Title);
        fs.appendFile('log.txt', "Release Year: " + body.Year);
        fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
        fs.appendFile('log.txt', "Country: " + body.Country);
        fs.appendFile('log.txt', "Language: " + body.Language);
        fs.appendFile('log.txt', "Plot: " + body.Plot);
        fs.appendFile('log.txt', "Actors: " + body.Actors);
        fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
        fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
  
      } else{
        console.log('Error occurred.')
      }
      if(movie === "Mr. Nobody"){
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
  
        //adds text to log.txt
        fs.appendFile('log.txt', "-----------------------");
        fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFile('log.txt', "It's on Netflix!");
      }
    });
  
  }
  
  function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      spotifySong(txt[1]);
    });
  }

