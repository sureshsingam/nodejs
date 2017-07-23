const request = require('request');
const yargs = require('yargs');
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

// console.log(argv);

// Getting the address option 
var option = argv.address;
// console.log(`Un-encoded address option string ${option}`);

var encodedOption = encodeURIComponent(option);
// console.log(`Encoded address option string ${encodedOption}`);

request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedOption}`,
    json:true
},(error,response,body) => {
    
    if (error){
        console.log('unable to connect to google servers');
    }
    else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find the address');
    }
    else if (body.status === 'OK'){
        // console.log(JSON.stringify(body,undefined,2));
        //  console.log(JSON.stringify(body,undefined,2));
        var result_object = body.results[0];
        var address_components = result_object['address_components'];
        var formatted_address = result_object['formatted_address'];
        var geometry = result_object['geometry'];
        var place_id = result_object['place_id'];
        var types = result_object['types'];

        // console.log(JSON.stringify(formatted_address,undefined,2));
        console.log(`Formatted address is ${formatted_address}`);
        // print the geometry
        console.log(`Latitude is ${geometry.location.lat}`);
        console.log(`Longitude is ${geometry.location.lng}`);

        // console.log('Response Code is below \n -----------------')
        // console.log(response.statusCode);
        // console.log('Full Response is below \n -----------------')
        // console.log(response);
        // console.log(response.statusMessage);
        // console.log(response.headers['cache-control']);
    }
});
