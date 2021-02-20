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
                console.log("🚀 ~ file: app.js ~ line 26 ~ main ~ selectedId", selectedId)
                const selectedCity = result.find( item => item.id === selectedId)

                //Show data
                console.log('\n======INFO======'.magenta);
                console.log('City Name:', selectedCity.name);
                console.log('Lat:', selectedCity.position[0]);
                console.log('Lng:', selectedCity.position[1]);
                console.log('Weather:',);
                console.log('Min:',);
                console.log('Max:',);

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