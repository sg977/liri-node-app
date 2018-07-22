require("dotenv").config();
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);




//node liri.js my-tweets: this will show your last 20 tweets and when they were created at in your terminal/bash window
//node liri.js spotify-this-song '<song name here>': #1 artist, the song's name, a preview link of the song from Spotify, the album that songs from #2if no song is provided then your program will default to "The Sign by Ace of Base"
//node liri.js movie-this '<movie name here>':#1 title of the movie, year the movie, IMDB rating of the movie, rotten tomatoes rating of the movie, country where the movie was produced, language of the movie, plot of the movie, actors in the movie #2 if the user doest type a movie in, the program will output data fro the movie 'Mr.Nobody'
//node liri.js do-what-it-says: it should run spotify-this-song for "I Want it That Way", as follows the text in random text



//spotify: client ID: BK3RLBpzwiphoTetk2FdfRD4vzV1KkLEYnmvTcC1xViZv
//sptify client secret 41d738fc047f4e5d9a2ad4744f30d4a4