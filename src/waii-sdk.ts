import History from "../clients/history/src/History"
import Query from "../clients/query/src/Query"
import Database from "../clients/database/src/Database"
import SemanticContext from "../clients/semantic-context/src/SemanticContext"
import AccessKey from "../clients/AccessKey/src/AccessKey";
import HealthCheck from "../clients/health/src/HealthCheck";
import WaiiHttpClient from "../lib/src/WaiiHttpClient";
import Authorization from "../clients/authorization/src/Authorization";


class Waii {
    public HttpClient!: WaiiHttpClient;
    public History!: History;
    public SemanticContext!: SemanticContext;
    public Query!: Query;
    public Database!: Database;
    public AccessKey!: AccessKey;
    public HealthCheck!: HealthCheck;
    public Authorization!: Authorization;
    
    public constructor(url: string = 'http://localhost:9859/api/', apiKey: string = '') {
        this.initialize(url, apiKey);
    }

    public initialize(url: string = 'http://localhost:9859/api/', apiKey: string = '') {
            this.HttpClient = new WaiiHttpClient(url, apiKey);
            this.History = new History(this.HttpClient);
            this.SemanticContext = new SemanticContext(this.HttpClient);
            this.Query = new Query(this.HttpClient);
            this.Database = new Database(this.HttpClient);
            this.AccessKey = new AccessKey(this.HttpClient);
            this.HealthCheck = new HealthCheck(this.HttpClient);
            this.Authorization = new Authorization(this.HttpClient);
    };
}

const WAII = new Waii();

export default WAII;
export {
    Waii
};
