import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const GENERATE_ENDPOINT: string = 'generate-query';
const RUN_ENDPOINT: string = 'run-query';
const FAVORITE_ENDPOINT: string = 'like-query';
const DESCRIBE_ENDPOINT: string = 'describe-query';
const RESULTS_ENDPOINT: string = 'get-query-result';
const CANCEL_ENDPOINT: string = 'cancel-query';

export let Query = (
    function () {
        return {
            generate: (
                params: object = {}, 
                callback: (result: string) => void, 
                error: (detail: object) => void
            ) => {
                WaiiHttpClient.getInstance().commonFetch(
                    GENERATE_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            run: (
                params: object = {}, 
                callback: (result: string) => void, 
                error: (detail: object) => void
            ) => {
                WaiiHttpClient.getInstance().commonFetch(
                    RUN_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            like: (
                params: object = {}, 
                callback: (result: string) => void, 
                error: (detail: object) => void
            ) => {
                WaiiHttpClient.getInstance().commonFetch(
                    FAVORITE_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            getResults: (
                params: object = {}, 
                callback: (result: string) => void, 
                error: (detail: object) => void
            ) => {
                WaiiHttpClient.getInstance().commonFetch(
                    RESULTS_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            cancel: (
                params: object = {}, 
                callback: (result: string) => void, 
                error: (detail: object) => void
            ) => {
                WaiiHttpClient.getInstance().commonFetch(
                    CANCEL_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            describe: (
                params: object = {}, 
                callback: (result: string) => void, 
                error: (detail: object) => void
            ) => {
                WaiiHttpClient.getInstance().commonFetch(
                    DESCRIBE_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
        }
    }
);

export default Query;