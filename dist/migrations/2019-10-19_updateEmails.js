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
exports.default = (db, dryRun = false) => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        up: () => __awaiter(void 0, void 0, void 0, function* () {
            const usersCollection = yield db.collection("users").get();
            const users = {};
            for (const user of usersCollection.docs) {
                const email = user.data().email;
                try {
                    yield user.ref.set({
                        email: "test@email.com"
                    }, { merge: true });
                    users[user.id] = {
                        email
                    };
                }
                catch (error) {
                    console.log(error);
                }
            }
            return {
                users
            };
        }),
        down: () => __awaiter(void 0, void 0, void 0, function* () {
            return true;
        })
    });
});
//# sourceMappingURL=2019-10-19_updateEmails.js.map