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
const Job_1 = require("../../models/Job");
const User_1 = require("../../models/User");
/**
 * This will tie a user to a job ticket
 */
function tieUserToJobUnit(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const Jobs = new Job_1.JobModel();
        const Users = new User_1.UserModel();
        const updatedJob = (yield Jobs.update(Object.assign(Object.assign({}, (yield Jobs.find(data.job))), { user: Users.ref().doc(data.user) })));
        updatedJob.user = yield Users.find(data.user);
        return updatedJob;
    });
}
exports.default = tieUserToJobUnit;
//# sourceMappingURL=tieUserToJob.js.map