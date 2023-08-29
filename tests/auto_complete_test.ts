import WAII from "../src/waii-sdk";

async function main() {
    console.log('-----Initializing WAII-----');

    // read from ~/.waii/conf.yaml local file, which include url and apiKey
    let file = require('fs').readFileSync(require('os').homedir() + '/.waii/conf.yaml', 'utf8');
    let config = require('js-yaml').load(file);
    let url = config.url;
    let apiKey = config.apiKey;
    WAII.initialize(url, apiKey);

    // Do a list of all the databases
    let databases = await WAII.Database.getConnections()

    if (!databases.connectors) {
        console.log('-----No Database Connection-----');
        return
    }

    let default_db_connection_key = databases.connectors[0].key
    console.log('-----Default Connection-----', default_db_connection_key);

    await WAII.Database.activateConnection(default_db_connection_key)

    let auto_complete = await WAII.Query.autoComplete({
        text: 'select * from ',
        dialect: 'snowflake',
        cursor_offset: 14
    })
    console.log('-----Auto Complete-----', auto_complete);
}

main();
