import History from "../clients/history/src/History"
import Query from "../clients/query/src/Query"
import Database from "../clients/database/src/Database"
import SemanticContext from "../clients/semantic-context/src/SemanticContext"
import WaiiHttpClient from "../lib/src/WaiiHttpClient"

export let WAII = (
    function () {
        return {
            History: History,
            SemanticContext: SemanticContext,
            Query: Query,
            Database: Database,
            initialize: async (url: string = 'http://localhost:9859/api/', apiKey: string = '') => {
                WaiiHttpClient.getInstance(url, apiKey);
                let result = await WAII.Database.getConnections({});

                let activeConnection = null
                if (result.default_db_connection_key) {
                    activeConnection = result.default_db_connection_key
                    await WAII.Database.activateConnection(result.default_db_connection_key);
                } else if (result.connectors && result.connectors.length > 0) {
                    activeConnection = result.connectors[0].key
                    await WAII.Database.activateConnection(result.connectors[0].key);
                }

                return activeConnection
            },
        }
    }
)();

export default WAII;
