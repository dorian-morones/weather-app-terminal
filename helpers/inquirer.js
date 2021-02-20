const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'Select an option',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search city`,
            },
            {
                value: 2,
                name: `${'2.'.green} Record`,
            },
            {
                value: 0,
                name: `${'0'.brightYellow} Exit`,
            },
        ]
    }
]
const inquirerMenu = async () => {
    console.log('===================='.blue);
    console.log('  Select an option'.white);
    console.log('====================\n'.blue);

    const { options } = await inquirer.prompt(questions)
    return options;
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'city',
            message: message,
            valdiate(value) {
                if (value.length === 0) {
                    'This value is required'
                }
                return true;
            }
        }
    ]

    const { city } = await inquirer.prompt(question);
    return city;

};

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'enter'.green} to continue`
        }
    ]
    await inquirer.prompt(question)
}

const listCities = async (data) => {

    const choices = data.map((item, index) => {
        const idx = `${index + 1}`.green
        return {
            value: item.id,
            name: `${idx} ${item.name}`
        }
    })
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a city',
            choices: choices

        }
    ]
    const { id } = await inquirer.prompt(question)
    return id;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
};

const listTaskToUpdate = async (tasks) => {

    const choices = tasks.map((item, index) => {
    console.log("🚀 ~ file: inquirer.js ~ line 108 ~ choices ~ item", item)
        const idx = `${index + 1}`.green
        return {
            value: item.id,
            name: `${idx} ${item}`,
        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices: choices

        }
    ]
    const { ids } = await inquirer.prompt(question)
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listCities,
    confirm,
    listTaskToUpdate
}