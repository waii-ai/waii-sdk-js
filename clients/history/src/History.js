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
exports.History = void 0;
const WaiiHttpClient_1 = __importDefault(require("../../../lib/src/WaiiHttpClient"));
const GET_ENDPOINT = 'get-generated-query-history';
exports.History = (function () {
    return {
        list: (params = {}, signal) => __awaiter(this, void 0, void 0, function* () {
            return WaiiHttpClient_1.default.getInstance().commonFetch(GET_ENDPOINT, {}, signal);
        })
    };
})();
exports.default = exports.History;
