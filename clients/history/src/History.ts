import WaiiHttpClient from "../../../lib/src/WaiiHttpClient"
import { GeneratedQuery, QueryGenerationRequest } from "../../query/src/Query"

const GET_ENDPOINT: string = 'get-generated-query-history';

type GeneratedQueryHistoryEntry = {
    query?: GeneratedQuery,
    request?: QueryGenerationRequest
}

type GetGeneratedQueryHistoryRequest = {
}

type GetGeneratedQueryHistoryResponse = {
    history?: GeneratedQueryHistoryEntry[]
}

export let History = (
    function () {
        return {
            list: async (params: GetGeneratedQueryHistoryRequest = {},
                signal?: AbortSignal): Promise<GetGeneratedQueryHistoryResponse> => 
                WaiiHttpClient.getInstance().commonFetch(
                    GET_ENDPOINT,
                    {},
                    signal
                )
        }
    }
)();

export default History;
export { 
    GeneratedQueryHistoryEntry, 
    GetGeneratedQueryHistoryRequest, 
    GetGeneratedQueryHistoryResponse, 
    GeneratedQuery 
};
