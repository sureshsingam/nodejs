const request = require('request');

var geocodeAddress = (address,callback) => {

    var encodedOption = encodeURIComponent(address);
    // console.log(`Encoded address option string ${encodedOption}`);

    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedOption}`,
        json:true
    },(error,response,body) => {
        
        if (error){
            callback('unable to connect to google servers');
        }
        else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find the address');            
        }
        else if (body.status === 'OK'){
            callback(undefined,{
                address:body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng
            });            
            // console.log(JSON.stringify(body,undefined,2));
            //  console.log(JSON.stringify(body,undefined,2));
            // var result_object = body.results[0];
            // var address_components = result_object['address_components'];
            // var formatted_address = result_object['formatted_address'];
            // var geometry = result_object['geometry'];
            // var place_id = result_object['place_id'];
            // var types = result_object['types'];

            // console.log(JSON.stringify(formatted_address,undefined,2));
            // console.log(`Formatted address is ${formatted_address}`);
            // // print the geometry
            // console.log(`Latitude is ${geometry.location.lat}`);
            // console.log(`Longitude is ${geometry.location.lng}`);

            // console.log('Response Code is below \n -----------------')
            // console.log(response.statusCode);
            // console.log('Full Response is below \n -----------------')
            // console.log(response);
            // console.log(response.statusMessage);
            // console.log(response.headers['cache-control']);
            
        }
    });    

};


module.exports = {
    // addNote: addNote
    geocodeAddress // Es6 shortcut, means the same as above
    
}