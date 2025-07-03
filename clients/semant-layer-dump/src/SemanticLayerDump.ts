/**
 * Copyright 2023–2025 Waii, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import WaiiHttpClient from '../../../lib/src/WaiiHttpClient';
import Database, { SearchContext } from '../../../clients/database/src/Database';

const SEMANTIC_LAYER_EXPORT_ENDPOINT = 'semantic-layer/export';
const SEMANTIC_LAYER_EXPORT_CHECK_STATUS_ENDPOINT = 'semantic-layer/export/status';
const SEMANTIC_LAYER_IMPORT_ENDPOINT = 'semantic-layer/import';
const SEMANTIC_LAYER_IMPORT_CHECK_STATUS_ENDPOINT = 'semantic-layer/import/status';

type ImportSemanticLayerDumpRequest = {
    search_context?: SearchContext[];
    db_conn_key: string;
    configuration: Record<string, any>;
    schema_mapping: Record<string, string>;
    database_mapping: Record<string, string>;
    strict_mode: boolean;
    dry_run_mode: boolean;
};

type ImportSemanticLayerDumpResponse = {
    op_id: string;
};

type ExportSemanticLayerDumpRequest = {
    db_conn_key: string;
    search_context?: SearchContext[];
};

type ExportSemanticLayerDumpResponse = {
    op_id: string;
};

type CheckStatusSemanticLayerDumpRequest = {
    op_id: string;
};

enum OperationStatus {
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
    IN_PROGRESS = 'in_progress',
    NOT_EXISTS = 'not_exists',
}

type CheckStatusSemanticLayerDumpResponse = {
    op_id: string;
    status: OperationStatus;
    info?: string | any;
};

class SemanticLayerDump {
    private httpClient: WaiiHttpClient;
    private database: Database;

    constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
        this.database = new Database(httpClient);
    }

    public async export(params: ExportSemanticLayerDumpRequest) {
        // before exporting, we need to activate the db connection
        await this.database.activateConnection(params.db_conn_key);

        if (!params.search_context) {
            params.search_context = [
                {
                    db_name: '*',
                    schema_name: '*',
                    table_name: '*',
                },
            ];
        }

        return this.httpClient.commonFetch<ExportSemanticLayerDumpResponse>(SEMANTIC_LAYER_EXPORT_ENDPOINT, params);
    }

    public async checkExportStatus(params: CheckStatusSemanticLayerDumpRequest) {
        return this.httpClient.commonFetch<CheckStatusSemanticLayerDumpResponse>(
            SEMANTIC_LAYER_EXPORT_CHECK_STATUS_ENDPOINT,
            params
        );
    }

    public async import(params: ImportSemanticLayerDumpRequest) {
        // before importing, we need to activate the db connection
        await this.database.activateConnection(params.db_conn_key);

        if (!params.search_context) {
            params.search_context = [
                {
                    db_name: '*',
                    schema_name: '*',
                    table_name: '*',
                },
            ];
        }

        return this.httpClient.commonFetch<ImportSemanticLayerDumpResponse>(SEMANTIC_LAYER_IMPORT_ENDPOINT, params);
    }

    public async checkImportStatus(params: CheckStatusSemanticLayerDumpRequest) {
        return this.httpClient.commonFetch<CheckStatusSemanticLayerDumpResponse>(
            SEMANTIC_LAYER_IMPORT_CHECK_STATUS_ENDPOINT,
            params
        );
    }
}

export default SemanticLayerDump;
export {
    ExportSemanticLayerDumpRequest,
    ExportSemanticLayerDumpResponse,
    CheckStatusSemanticLayerDumpRequest,
    CheckStatusSemanticLayerDumpResponse,
    ImportSemanticLayerDumpRequest,
    ImportSemanticLayerDumpResponse,
};
