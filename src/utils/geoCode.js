const request = require("request");

const geoCode =(address, callback)=> {
    // const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZXN0aGVyNTUiLCJhIjoiY2t1OHEwNjEyMjUyeDJ2bzYxczdkY2ExNCJ9.RlOJc2bhzPDENVoL8W9soQ&limit=1";
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZXN0aGVyNTUiLCJhIjoiY2t1OHEwNjEyMjUyeDJ2bzYxczdkY2ExNCJ9.RlOJc2bhzPDENVoL8W9soQ&limit=1";
    request({url, json: true}, (e, {body} = {}) => {
        if (e){
            callback("Unable to reach location service!", undefined);
        } else if (body.message || body.features.length === 0 ){
            callback("No matching result. Try other searches!", undefined);
        } else{
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            });
        }
    })
}

module.exports= geoCode;