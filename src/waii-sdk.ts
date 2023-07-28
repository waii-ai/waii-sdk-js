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
            initialize(url: string = 'http://localhost:9859/api/', apiKey: string = '') {
                WaiiHttpClient.getInstance(url, apiKey);
            }
        }
    }
)()

export default WAII;