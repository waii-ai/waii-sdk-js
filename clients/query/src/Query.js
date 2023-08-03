"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const WaiiHttpClient_1 = __importDefault(require("../../../lib/src/WaiiHttpClient"));
const GENERATE_ENDPOINT = 'generate-query';
const RUN_ENDPOINT = 'run-query';
const SUBMIT_ENDPOINT = 'submit-query';
const FAVORITE_ENDPOINT = 'like-query';
const DESCRIBE_ENDPOINT = 'describe-query';
const RESULTS_ENDPOINT = 'get-query-result';
const CANCEL_ENDPOINT = 'cancel-query';
exports.Query = (function () {
    return {
        generate: (params, signal) => __awaiter(this, void 0, void 0, function* () {
            return WaiiHttpClient_1.default.getInstance().commonFetch(GENERATE_ENDPOINT, params, signal);
        }),
        run: (params, signal) => __awaiter(this, void 0, void 0, function* () {
            return WaiiHttpClient_1.default.getInstance().commonFetch(RUN_ENDPOINT, params, signal);
        }),
        like: (params, signal) => __awaiter(this, void 0, void 0, function* () {
            return WaiiHttpClient_1.default.getInstance().commonFetch(FAVORITE_ENDPOINT, params, signal);
        }),
        submit: (params, signal) => __awaiter(this, void 0, void 0, function* () {
            return WaiiHttpClient_1.default.getInstance().commonFetch(SUBMIT_ENDPOINT, params, signal);
        }),
        getResults: (params, signal) => __awaiter(this, void 0, void 0, function* () {
            return WaiiHttpClient_1.default.getInstance().commonFetch(RESULTS_ENDPOINT, params, signal);
        }),
        cancel: (params, signal) => __awaiter(this, void 0, void 0, function* () {
            return WaiiHttpClient_1.default.getInstance().commonFetch(CANCEL_ENDPOINT, params, signal);
        }),
        describe: (params, signal) => __awaiter(this, void 0, void 0, function* () {
            return WaiiHttpClient_1.default.getInstance().commonFetch(DESCRIBE_ENDPOINT, params, signal);
        }),
    };
})();
exports.default = exports.Query;
