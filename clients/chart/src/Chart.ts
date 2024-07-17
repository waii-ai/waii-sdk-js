import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const GENERATE_ENDPOINT: string = 'generate-chart';

type ChartGenerationRequest = {
    sql?: string;
    ask?: string;
    dataframeRows?: Record<string, any>[];
    dataframeCols?: Column[];
    chartType?: ChartType;
    parentUuid?: string;
    tweakHistory?: ChartTweak[];
}

type ChartGenerationResponse = {
    uuid: string;
    timestamp: number;
    chartSpec: ChartSpec;
}

type ChartType = 'metabase' | 'superset';

type ChartTweak = {
    ask: string;
    chartSpec: ChartSpec;
}

type Column = {
    name: string;
    type: string;
}

type ChartSpec = {
    plotType: ChartType;
    specType: string;
}

type MetabaseChartSpec = ChartSpec & {
    metric: string;
    dimension: string;
    name: string;
    colorHex: string;
}

type SuperSetChartSpec = ChartSpec & {
    metrics: string[];
    dimensions: string[];
    chartName: string;
    colorHex: string;
    xAxis: string;
    yAxis: string;
    gridStyle: string;
    stacked: boolean;
    width: number;
    height: number;
}

class Chart {

    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    }

    public async generate(params: ChartGenerationRequest, signal?: AbortSignal): Promise<ChartGenerationResponse> {
        return this.httpClient.commonFetch<ChartGenerationResponse>(
            GENERATE_ENDPOINT,
            params,
            signal
        );
    }
}

export default Chart;
export {
    ChartGenerationRequest,
    ChartGenerationResponse,
    ChartType,
    ChartTweak,
    Column,
    ChartSpec,
    MetabaseChartSpec,
    SuperSetChartSpec
};
