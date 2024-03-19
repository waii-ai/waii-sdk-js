import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const GET_ENDPOINT: string = 'get-models';

type Model = {
    name: string,
    description?: string,
    vendor?: string
}

type GetModelsRequest = {
}

type GetModelsResponse = {
    models?: Model[] 
}

class LLM {

    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    }

    public getModels(
        params: GetModelsRequest = {},
        signal?: AbortSignal
    ): Promise<GetModelsResponse> {
        return this.httpClient.commonFetch<GetModelsResponse>(
            GET_ENDPOINT,
            params,
            signal
        );
    };
};

export default LLM;
export {
    Model,
    GetModelsRequest,
    GetModelsResponse
};