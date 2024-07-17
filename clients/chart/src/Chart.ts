import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const GENERATE_ENDPOINT: string = 'generate-chart';

type ChartGenerationRequest = {
    sql?: string;
    ask?: string;
    dataframe_rows?: Record<string, any>[];
    dataframe_cols?: Column[];
    chart_type?: ChartType;
    parent_uuid?: string;
    tweak_history?: ChartTweak[];
}

type ChartGenerationResponse = {
    uuid: string;
    timestamp: number;
    chart_spec: ChartSpec;
}

type ChartType = 'metabase' | 'superset';

type ChartTweak = {
    ask: string;
    chart_spec: ChartSpec;
}

type Column = {
    name: string;
    type: string;
}

type ChartSpec = {
    plot_type: ChartType;
    spec_type: string;
}

type MetabaseChartSpec = ChartSpec & {
    metric: string;
    dimension: string;
    name: string;
    color_hex: string;
}

type SuperSetChartSpec = ChartSpec & {
    metrics: string[];
    dimensions: string[];
    chart_name: string;
    color_hex: string;
    x_axis: string;
    y_axis: string;
    grid_style: string;
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
