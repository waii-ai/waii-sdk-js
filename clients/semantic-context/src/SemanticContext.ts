import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const MODIFY_ENDPOINT: string = 'update-semantic-context';
const GET_ENDPOINT: string = 'get-semantic-context';

export let SemanticContext = (
    function () {
        return {
            modifySemanticContext: (
                params: object = {}, 
                callback: (result: string) => void, 
                error: (detail: object) => void
            ) => {
                WaiiHttpClient.getInstance().commonFetch(
                    MODIFY_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            getSemanticContext: (
                params: object = {}, 
                callback: (result: string) => void, 
                error: (detail: object) => void
            ) => {
                WaiiHttpClient.getInstance().commonFetch(
                    GET_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
        }
    }
);

export default SemanticContext;