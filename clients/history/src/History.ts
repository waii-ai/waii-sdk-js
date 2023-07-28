import WaiiHttpClient from "../../../lib/src/WaiiHttpClient"

const GET_ENDPOINT: string = 'get-generated-query-history';

export let History = (
    function () {
        return {
            list: function (
                params: object = {},
                callback: (result: string) => void,
                error: (detail: object) => void
            ) {
                WaiiHttpClient.getInstance().commonFetch(
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
