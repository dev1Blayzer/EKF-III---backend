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
function session({ req, admin, db }) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers &&
            req.headers.authorization &&
            req.headers.authorization !== "null"
            ? req.headers.authorization.replace("Bearer ", "")
            : null;
        let decodedToken = null;
        try {
            decodedToken = token ? yield admin.auth().verifyIdToken(token) : null;
        }
        catch (err) {
            console.log(err.message);
        }
        const getRole = () => __awaiter(this, void 0, void 0, function* () {
            const role = (yield db
                .collection("roles")
                .doc(token)
                .get()).data();
            return role ? [role] : [];
        });
        return {
            referrer: req.headers && req.headers.referer ? req.headers.referer : null,
            token,
            user: decodedToken
                ? (yield db
                    .collection("users")
                    .doc(decodedToken.uid)
                    .get()).data()
                : null,
            roles: decodedToken
                ? (yield db
                    .collection("users")
                    .doc(decodedToken.uid)
                    .collection("roles")
                    .get()).docs
                : !decodedToken && token
                    ? yield getRole()
                    : [],
        };
    });
}
exports.default = session;
//# sourceMappingURL=session.js.map