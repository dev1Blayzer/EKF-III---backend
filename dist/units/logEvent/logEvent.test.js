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
const connect_1 = require("../../connect");
connect_1.default();
const logEvent_1 = require("./logEvent");
describe("This creates a log for an event on the system", () => {
    it("Should ", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const type = "Test";
        const name = "jest";
        const response = yield logEvent_1.default({
            type,
            name
        });
        console.log(response);
        expect(response).toMatchObject({
            type,
            name
        });
        done();
    }));
});
//# sourceMappingURL=logEvent.test.js.map