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

    async city(place) {
        console.log("🚀 ~ file: search.js ~ line 11 ~ Search ~ city ~ place", place);

        const http = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
            params: this.MapboxParams
        });

        

        try {
            const resp = await http.get();
            console.log("🚀 ~ file: search.js ~ line 32 ~ Search ~ city ~ resp", resp.data)
            return [];

        } catch (e) {
            console.error(e);
        }
    }


}

module.exports = Search;