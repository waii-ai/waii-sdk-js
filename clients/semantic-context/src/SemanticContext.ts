import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { v4 as uuidv4 } from 'uuid';

const MODIFY_ENDPOINT: string = 'update-semantic-context';
const GET_ENDPOINT: string = 'get-semantic-context';

class SemanticStatement {
    id?: string
    scope: string
    statement: string
    labels?: string[]
    always_include?: boolean
    search_keys?: string[]
    extract_prompt?: string

    public constructor(
        scope: string = '*',
        statement: string,
        labels: string[] = [],
        always_include: boolean = true,
        search_keys: string[] = [],
        extract_prompt: string = ''
    ) {
        this.id = uuidv4();
        this.scope = scope;
        this.statement = statement;
        this.labels = labels;
        this.always_include = always_include;
        this.search_keys = search_keys;
        this.extract_prompt = extract_prompt;
    }
}

type ModifySemanticContextRequest = {
    updated?: SemanticStatement[],
    deleted?: string[]
}

type ModifySemanticContextResponse = {
    updated?: SemanticStatement[],
    deleted?: string[]
}

type GetSemanticContextRequestFilter = {
    always_include?: boolean
}

type GetSemanticContextRequest = {
    filter?: GetSemanticContextRequestFilter
    search_text?: string
    offset?: number
    limit?: number
}

type GetSemanticContextResponse = {
    semantic_context?: SemanticStatement[]
    total_candidates?: number
}

export let SemanticContext = (
    function () {
        return {
            modifySemanticContext: async (
                params: ModifySemanticContextRequest,
                signal?: AbortSignal
            ): Promise<ModifySemanticContextResponse> => {
                return WaiiHttpClient.getInstance().commonFetch<ModifySemanticContextResponse>(
                    MODIFY_ENDPOINT,
                    params,
                    signal
                );
            },
            getSemanticContext: (
                params: GetSemanticContextRequest = {},
                signal?: AbortSignal
            ): Promise<GetSemanticContextResponse> => {
                return WaiiHttpClient.getInstance().commonFetch<GetSemanticContextResponse>(
                    GET_ENDPOINT,
                    params,
                    signal
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
    GetSemanticContextRequestFilter,
    GetSemanticContextRequest,
    GetSemanticContextResponse
};