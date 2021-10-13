const request = require("request");

const forecast =(lat, long, callback)=>{
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=6578b3a8990f43a0a10234336213009&q=' + encodeURIComponent(lat) +',' + encodeURIComponent(long) + '&hour=6&days=10&aqi=no&alerts=no08&lang=en';
    request({url, json: true}, (error, {body} = {})=>{
        if(error){
            callback("Unable to connect to weather service", undefined);
        } else if (body.error){
            callback("No matching result. Try other searches!", undefined);
        } else{
            callback(undefined, body.current.condition.text + ". It is currently " + body.current.temp_c +" degrees out with UV index of " + body.current.uv + ". There is a "+ body.current.precip_mm +"% chance of rain"); 
        }
    })
}

module.exports = forecast;