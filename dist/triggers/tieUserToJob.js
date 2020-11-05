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
const functions = require("firebase-functions");
const connect_1 = require("../connect");
const tieUserToJob_1 = require("../units/tieUserToJob/tieUserToJob");
exports.default = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    connect_1.default();
    res.status(200).send({
        job: yield tieUserToJob_1.default(req.body && req.body.data ? req.body.data : {})
    });
}));
//# sourceMappingURL=tieUserToJob.js.map