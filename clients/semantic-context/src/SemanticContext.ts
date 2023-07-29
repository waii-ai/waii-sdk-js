import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { v4 as uuidv4 } from 'uuid';

const MODIFY_ENDPOINT: string = 'update-semantic-context';
const GET_ENDPOINT: string = 'get-semantic-context';

class SemanticStatement {
    id?: string
    scope: string
    statement: string
    labels?: string[]

    public constructor(scope: string = '*', statement: string, labels: string[] = []) {
        this.id = uuidv4();
        this.scope = scope;
        this.statement = statement;
        this.labels = labels;
    }
}

type ModifySemanticContextRequest = {
    updated?: [SemanticStatement],
    deleted?: [string]
}

type ModifySemanticContextResponse = {
    updated?: [SemanticStatement],
    deleted?: [string]
}

type GetSemanticContextRequest = {
}

type GetSemanticContextResponse = {
    semantic_context?: SemanticStatement[]
}

export let SemanticContext = (
    function () {
        return {
            modifySemanticContext: (
                params: ModifySemanticContextRequest,
                callback: (result: ModifySemanticContextResponse) => void,
                error: (detail: object) => void
            ): AbortController => {
                return WaiiHttpClient.getInstance().commonFetch(
                    MODIFY_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            getSemanticContext: (
                params: GetSemanticContextRequest = {},
                callback: (result: GetSemanticContextResponse) => void,
                error: (detail: object) => void
            ): AbortController => {
                return WaiiHttpClient.getInstance().commonFetch(
                    GET_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
        }
    }
)();

export default SemanticContext;
export {
    SemanticStatement,
    ModifySemanticContextRequest,
    ModifySemanticContextResponse,
    GetSemanticContextRequest,
    GetSemanticContextResponse
};