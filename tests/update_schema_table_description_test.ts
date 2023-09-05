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

    let default_db_connection_key = "TODO"// TODO
    console.log('-----Default Connection-----', default_db_connection_key);

    await WAII.Database.activateConnection(default_db_connection_key)

    await WAII.Database.updateTableDescription({
        description: "test test 123",
        table_name: {
            table_name: "STREAMLITS",
            schema_name: "INFORMATION_SCHEMA",
            database_name: "INSTACART"
        }
    })

    await WAII.Database.updateSchemaDescription({
        description: {
            summary: "test test 123",
            common_questions: ["test test 123"],
            common_tables: [{
                name: "STREAMLITS",
                description: "test test 123"
            },
            {
                name: "STREAMLITS",
                description: "test test 123"
            }]
        },
        schema_name: {
            schema_name: "INFORMATION_SCHEMA",
            database_name: "INSTACART"
        }
    })

    await WAII.Database.updateSchemaDescription({
        description: {
            summary: "test test 123",
            common_questions: ["test test 123"],
            common_tables: [{
                name: "STREAMLITS",
                description: "test test 123"
            },
                {
                    name: "STREAMLITS",
                    description: "test test 123"
                }]
        },
        schema_name: {
            schema_name: "NOT_EXISTED",
            database_name: "INSTACART"
        }
    }).catch((err) => {
        console.log(err)
    })

    await WAII.Database.updateTableDescription({
        description: "test test 123",
        table_name: {
            table_name: "NOT_EXISTED",
            schema_name: "INFORMATION_SCHEMA",
            database_name: "INSTACART"
        }
    }).catch((err) => {
        console.log(err)
    })
}

main();
