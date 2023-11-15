import History from "../clients/history/src/History"
import Query from "../clients/query/src/Query"
import Database from "../clients/database/src/Database"
import SemanticContext from "../clients/semantic-context/src/SemanticContext"
import AccessKey from "../clients/AccessKey/src/AccessKey";
import HealthCheck from "../clients/health/src/HealthCheck";
import WaiiHttpClient from "../lib/src/WaiiHttpClient"

export let WAII = (
    function () {
        return {
            History: History,
            SemanticContext: SemanticContext,
            Query: Query,
            Database: Database,
            AccessKey: AccessKey,
            HealthCheck: HealthCheck,
            initialize: (url: string = 'http://localhost:9859/api/', apiKey: string = '') => {
                WaiiHttpClient.getInstance(url, apiKey);
            },
        }
    }
)();

export default WAII;
