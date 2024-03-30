import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const GENERATE_ENDPOINT: string = 'generate-chart';

enum ChartType {
    vega_lite = "vega_lite"
};

type ChartTweak = {
    chart_type: ChartType,
    chart_spec?: string,
    ask?: string,
    sql?: string
};

type ChartGenerationRequest = {
    sql?: string
    ask?: string
    chart_type: ChartType,
    history?: ChartTweak[],
    model?: string
};

type GeneratedChart = {
    chart_spec: string,
    uuid: string,
    detailed_steps?: string[]
};

class Chart {
    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    };

    public async generate(
        params: ChartGenerationRequest,
        signal?: AbortSignal
    ): Promise<GeneratedChart> {
        return this.httpClient.commonFetch<GeneratedChart>(
            GENERATE_ENDPOINT,
            params,
            signal
        );
    };
};

export default Chart;
export {
    ChartGenerationRequest,
    ChartTweak,
    ChartType,
    GeneratedChart
};
