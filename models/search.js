const axios = require('axios');

class Search {

    record = [];


    constructor() {
        //TODO = READ FROM DB
    }

    get MapboxParams() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'autocomplete': true,
        }
    }

    get OWParams() {
        return {
            'appid': process.env.OW_KEY,
            'units': 'metric',
        }
    }

    async city(place) {
        const http = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
            params: this.MapboxParams
        });

        try {
            const resp = await http.get();
            return resp.data.features.map( item => ({
                id: item.id,
                name: item.place_name,
                lat: item.center[1],
                lon: item.center[0],
            }));

        } catch (e) {
            console.error(e);
        }
    }

    async cityWeather(lat, lon){

        const http = axios.create({
            baseURL: 'http://api.openweathermap.org/data/2.5/weather?',
            params: { ...this.OWParams, lat, lon }
        });

        try{
            const resp = await http.get();
            const { weather, main } = resp.data;
            
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch(e){
            console.error('ERROR', e)
        }
    }

}

module.exports = Search;