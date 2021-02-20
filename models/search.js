const fs = require('fs');
const axios = require('axios');

class Search {

    record = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get capitalizeRecord() {
        return this.record.map( item => {

            let word = item.split(' ');
            word = word.map( w => w[0].toUpperCase() + w.substring(1) );

            return word.join(' ')

        })
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

    addToRecord(place) {
        if( this.record.includes( place.toLocaleLowerCase() ) ){
            return;
        }
        this.record = this.record.splice(0,5);

        this.record.unshift( place.toLocaleLowerCase() );

        // Save in db/file
        this.saveDB();
    }

    saveDB() {
        const payload = {
            record: this.record
        };
        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );
    }

    readDB() {
        if( !fs.existsSync( this.dbPath ) ) return;
        
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.record = data.record;
    }

}

module.exports = Search;