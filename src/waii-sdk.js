"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAII = void 0;
const History_1 = __importDefault(require("../clients/history/src/History"));
const Query_1 = __importDefault(require("../clients/query/src/Query"));
const Database_1 = __importDefault(require("../clients/database/src/Database"));
const SemanticContext_1 = __importDefault(require("../clients/semantic-context/src/SemanticContext"));
const WaiiHttpClient_1 = __importDefault(require("../lib/src/WaiiHttpClient"));
exports.WAII = (function () {
    return {
        History: History_1.default,
        SemanticContext: SemanticContext_1.default,
        Query: Query_1.default,
        Database: Database_1.default,
        initialize: (url = 'http://localhost:9859/api/', apiKey = '') => {
            WaiiHttpClient_1.default.getInstance(url, apiKey);
        },
    };
})();
exports.default = exports.WAII;
