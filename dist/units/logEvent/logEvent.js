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
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const Log_1 = require("../../models/Log");
function cleanObject(obj) {
    const newObj = {};
    for (const key of Object.keys(obj)) {
        newObj[key] =
            obj[key] && typeof obj[key] === "object" && !!obj[key]._firestore
                ? { id: obj[key].id, path: obj[key].path }
                : obj[key];
    }
    return newObj;
}
function cleanAndStringifyData(input) {
    if (typeof input === "string")
        return input;
    return JSON.stringify(typeof input === "object" && input.length
        ? input.map(row => cleanObject(row))
        : cleanObject(input), null, 2);
}
/**
 * This creates a log for an event on the system
 */
function logEvent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data || !data.type || !data.name)
            throw new Error("Type and Name of event are required!");
        const log = yield new Log_1.LogModel().create(Object.assign(Object.assign({}, data), { createdAt: data.createdAt
                ? data.createdAt
                : firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), resolveTime: data.resolveTime ? data.resolveTime : 0, input: data.input ? cleanAndStringifyData(data.input) : "{}", output: data.output ? cleanAndStringifyData(data.output) : "{}" }));
        console.log(`${log.id} - ${data.type}.${data.name} [${data.resolveTime} ms]`);
        return log;
    });
}
exports.default = logEvent;
//# sourceMappingURL=logEvent.js.map