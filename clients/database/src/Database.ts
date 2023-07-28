import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const MODIFY_ENDPOINT: string = 'update-db-connect-info';
const GET_ENDPOINT: string = 'get-table-definitions';

export let Database = (
    function () {
        return {
            modifyConnections: (
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
            getConnections: (
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

export default Database;
