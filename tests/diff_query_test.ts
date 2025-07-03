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

import WAII from '../src/waii-sdk';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { load } from 'js-yaml';

async function main() {
    console.log('-----Initializing WAII-----');

    // read from ~/.waii/conf.yaml local file, which include url and apiKey
    let file = readFileSync(homedir() + '/.waii/conf.yaml', 'utf8');
    let config = load(file) as any;
    let url = config.url;
    let apiKey = config.apiKey;
    WAII.initialize(url, apiKey);

    // Do a list of all the databases
    let databases = await WAII.Database.getConnections();

    if (!databases.connectors) {
        console.log('-----No Database Connection-----');
        return;
    }

    let default_db_connection_key = databases.connectors[0].key;
    console.log('-----Default Connection-----', default_db_connection_key);

    await WAII.Database.activateConnection(default_db_connection_key);

    let response = await WAII.Query.diff({
        previous_query: 'select * from orders',
        query: 'select * from orders limit 10',
    });
    console.log('-----Diff-----', response);
}

main();
