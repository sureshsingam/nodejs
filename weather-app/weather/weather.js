const request = require('request');


var getWeather = (results, callback) => {
    var latitude = results.latitude;
    var longitude = results.longitude;
    var apikey = '982e8dba7b903a2949bbb49dcfe8f01d';
    

    
    //https://api.darksky.net/forecast/982e8dba7b903a2949bbb49dcfe8f01d/37.8267,-122.4233
    //  dark sky api: 982e8dba7b903a2949bbb49dcfe8f01d
    request({
        url:`https://api.darksky.net/forecast/${apikey}/${latitude},${longitude}`,
        json:true
    },(error,response,body) => {
        
       if (!error && response.statusCode === 200){
        // if not error reported, assume success in retrieving temperature

            var temp_f = body.currently.temperature;
            var celcius = (temp_f - 32) * 5/9;

            callback(undefined,{
                temperature_f:temp_f,
                temperature_c:celcius,
                actual_temperature:body.currently.apparentTemperature
            })
            
        }
        else{
            callback('unable to fetch weather')
        }
    });        
};


module.exports = {
    // addNote: addNote
    getWeather // Es6 shortcut, means the same as above
    
}