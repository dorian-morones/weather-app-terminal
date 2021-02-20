require('dotenv').config();
const {
    inquirerMenu,
    pause,
    readInput,
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
                await search.city(place)
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