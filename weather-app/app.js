const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.option({
  a:{
      demand:true,
      alias:'address',
      describe:'Address to fetch weather for location ',
      string:true
  }  
})
.help()
.alias('help','h')
.argv;

//https://api.darksky.net/forecast/982e8dba7b903a2949bbb49dcfe8f01d/37.8267,-122.4233
// dark sky api: 982e8dba7b903a2949bbb49dcfe8f01d


// console.log(argv);

// Getting the address option 
var address = argv.address;
// console.log(`Un-encoded address option string ${option}`);

// geocode has a callback function that processes the results of the geocodeAddress function
 geocode.geocodeAddress(address, (errorMessage,results) => {
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        // getWeather has a callback function that processes the output of the getWeather function
        weather.getWeather(results, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                console.log(`It is currently ${weatherResults.temperature_f}`);
                console.log(`It feels like ${weatherResults.actual_temperature}`)
            }

        });
        
    }

 });





