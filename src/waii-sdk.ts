import History from "../clients/history/src/History"
import Query from "../clients/query/src/Query"
import Database from "../clients/database/src/Database"
import SemanticContext from "../clients/semantic-context/src/SemanticContext"
import AccessKey from "../clients/AccessKey/src/AccessKey";
import HealthCheck from "../clients/health/src/HealthCheck";
import WaiiHttpClient from "../lib/src/WaiiHttpClient";
import Authorization from "../clients/authorization/src/Authorization";
import LLM from "../clients/model/src/Model";
import User from "../clients/user/src/User";
import Chat from "../clients/chat/src/Chat";
import Chart from "../clients/chart/src/Chart";
import Settings from "../clients/settings/src/Settings";
import SemanticLayerDump from "../clients/semant-layer-dump/src/SemanticLayerDump";
class Waii {
    public HttpClient!: WaiiHttpClient;
    public History!: History;
    public SemanticContext!: SemanticContext;
    public Query!: Query;
    public Database!: Database;
    public AccessKey!: AccessKey;
    public HealthCheck!: HealthCheck;
    public Authorization!: Authorization;
    public LLM!: LLM;
    public User!: User;
    public Chat!: Chat;
    public Chart!: Chart;
    public Settings!: Settings;
    public SemanticLayerDump!: SemanticLayerDump;
    public constructor(url: string = 'http://localhost:9859/api/', apiKey: string = '') {
        this.initialize(url, apiKey);
    }

    public initialize(url: string = 'http://localhost:9859/api/', apiKey: string = '', /* no longer used */fetch_func: any = null) {
            this.HttpClient = new WaiiHttpClient(url, apiKey);
            this.History = new History(this.HttpClient);
            this.SemanticContext = new SemanticContext(this.HttpClient);
            this.Query = new Query(this.HttpClient);
            this.Database = new Database(this.HttpClient);
            this.AccessKey = new AccessKey(this.HttpClient);
            this.HealthCheck = new HealthCheck(this.HttpClient);
            this.Authorization = new Authorization(this.HttpClient);
            this.LLM = new LLM(this.HttpClient);
            this.User = new User(this.HttpClient);
            this.Chart = new Chart(this.HttpClient);
            this.Chat = new Chat(this.HttpClient);
            this.Settings = new Settings(this.HttpClient);
            this.SemanticLayerDump = new SemanticLayerDump(this.HttpClient);
    };
}

const WAII = new Waii();

export default WAII;
export {
    Waii
};
