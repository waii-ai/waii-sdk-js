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
            list: function (
                params: GetGeneratedQueryHistoryRequest = {},
                callback: (result: GetGeneratedQueryHistoryResponse) => void,
                error: (detail: object) => void
            ): AbortController {
                return WaiiHttpClient.getInstance().commonFetch(
                    GET_ENDPOINT,
                    {},
                    callback,
                    error
                );
            }
        }
    }
);

export default History;
export { 
    GeneratedQueryHistoryEntry, 
    GetGeneratedQueryHistoryRequest, 
    GetGeneratedQueryHistoryResponse, 
    GeneratedQuery 
};
