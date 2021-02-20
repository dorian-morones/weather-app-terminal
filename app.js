require('dotenv').config();
const {
    inquirerMenu,
    pause,
    readInput,
    listCities
} = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async () => {

    let opt = 0;
    const search = new Search();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const place = await readInput();
                // Search cities
                const result = await search.city(place)

                // Select a result item - city
                const selectedId = await listCities(result);
                const selectedCity = result.find( item => item.id === selectedId)
                const weather = await search.cityWeather(selectedCity.lat, selectedCity.lon)

                //Show data
                console.clear();
                console.log('\n======INFO======'.magenta);
                console.log('City Name:', selectedCity.name);
                console.log('Lat:', selectedCity.lat);
                console.log('Lng:', selectedCity.lon);
                console.log('Weather:', weather.temp);
                console.log('Min:', weather.min);
                console.log('Max:', weather.max);
                console.log('Current status:', weather.desc)

                break;
            case 2:

                break;
            case 0:

                break;

        }
        if (opt !== 0) await pause();
    } while (opt !== 0)
}

main();