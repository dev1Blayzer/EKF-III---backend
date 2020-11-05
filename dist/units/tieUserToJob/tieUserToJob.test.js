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
const tieUserToJob_1 = require("./tieUserToJob");
describe("Add User to Job", () => {
    beforeAll(() => {
        connect_1.default();
    });
    it("Should tie a user to a job", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const job = yield tieUserToJob_1.default({
            user: "Fcvo4EPVu7d7K0z7A1H0oindJVU2",
            job: "dJVcvo4dPUFVu7d7K0z7A1Hloin2"
        });
        console.log(job);
        expect(job).toMatchObject({
            id: "dJVcvo4dPUFVu7d7K0z7A1Hloin2",
            user: {
                id: "Fcvo4EPVu7d7K0z7A1H0oindJVU2"
            }
        });
        done();
    }));
});
//# sourceMappingURL=tieUserToJob.test.js.map