const yargs = require('yargs');
const axios = require ('axios');

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


var encodedOption = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedOption}`;

axios.get(geocodeUrl).then((response)=>{

    // console.log(response.data.results[0]);
    // console.log(response.data.status);
    if (response.data.status === 'ZERO_RESULTS'){
        throw new Error('No data exist for the address or unable to find the address')
    }

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var apikey = '982e8dba7b903a2949bbb49dcfe8f01d';

    var weatherUrl = `https://api.darksky.net/forecast/${apikey}/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);

}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var celcius = Math.round((temperature - 32) * 5/9);
    var actual_temperature = response.data.currently.apparentTemperature;
    var celcius2 = Math.round ((actual_temperature - 32) * 5/9);
    console.log(`It is currently ${temperature} F / ${celcius} C and it feels like ${actual_temperature} F / ${celcius2} C `);

}).catch( (e)=>{
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to access google map api')
    }else{
        console.log(e.message)
    }
    
});